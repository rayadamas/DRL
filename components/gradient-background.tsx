"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion, useScrollNight } from "@/lib/hooks";

const SPHERE_RADIUS = 2.5;

type NightRef = React.MutableRefObject<number>;

const palette = {
  duskBg: new THREE.Color("#1A0F0A"),
  nightBg: new THREE.Color("#07060B"),
  // Back (far, palest) to front (near, deepest) dune.
  dusk: ["#F2C894", "#E0A15E", "#C8693A", "#8E3B22"].map(
    (hex) => new THREE.Color(hex),
  ),
  night: ["#5A2E1A", "#4A2618", "#3A1E14", "#2A150E"].map(
    (hex) => new THREE.Color(hex),
  ),
};

const STAR_TINTS = [
  { weight: 0.75, color: new THREE.Color(1.0, 0.96, 0.9) },
  { weight: 0.15, color: new THREE.Color(0.8, 0.88, 1.0) },
  { weight: 0.1, color: new THREE.Color(1.0, 0.82, 0.6) },
];

const duneVertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const duneFragmentShader = `
  uniform float uTime;
  uniform float uNight;
  uniform vec2 uResolution;
  uniform vec3 uDuskBg;
  uniform vec3 uNightBg;
  uniform vec3 uDusk[4];
  uniform vec3 uNightCol[4];

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vec2 s = gl_FragCoord.xy / uResolution;
    float t = uTime;

    vec3 bg = mix(uDuskBg, uNightBg, uNight);

    float glow = exp(-pow((s.y - 0.4) * 3.0, 2.0));
    vec3 glowCol = mix(uDusk[0] * 0.55, uNightCol[0] * 0.5, uNight);
    vec3 color = bg + glowCol * glow * mix(0.32, 0.1, uNight);

    for (int i = 0; i < 4; i++) {
      float fi = float(i);
      float x = s.x * (1.4 + fi * 0.45);
      float crest = 0.44 - fi * 0.11
        + 0.05 * sin(x * 2.3 + fi * 1.9 + t * 0.05 * (1.0 + fi * 0.3))
        + 0.022 * sin(x * 5.1 - t * 0.08 + fi * 2.7)
        + (noise(vec2(x * 3.0 + t * 0.03, fi * 4.0)) - 0.5) * 0.03;

      float below = smoothstep(crest + 0.004, crest - 0.004, s.y);
      float lit = 1.0 - clamp((crest - s.y) / 0.2, 0.0, 1.0);

      vec3 duneCol = mix(uDusk[i], uNightCol[i], uNight);
      vec3 body = mix(bg, duneCol, 0.2 + 0.6 * lit * lit);

      float wind = sin(s.x * 9.0 + s.y * 22.0 - t * 0.35 + fi * 3.0
        + noise(s * 6.0 + t * 0.08) * 2.0);
      body += duneCol * pow(0.5 + 0.5 * wind, 6.0) * 0.12 * lit;

      color = mix(color, body, below * 0.32);
    }

    // Keep the centered content column readable over the warmest areas.
    float column = exp(-pow((s.x - 0.5) * 2.4, 2.0));
    color *= 1.0 - 0.3 * column;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const starVertexShader = `
  attribute float aSize;
  attribute float aPhase;
  attribute float aRate;
  attribute vec3 aTint;

  uniform float uTime;
  uniform float uNight;
  uniform float uPixelRatio;
  uniform float uBaseSize;
  uniform float uTwinkle;

  varying float vAlpha;
  varying vec3 vTint;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float depth = -mvPosition.z;

    float t = uTime * aRate + aPhase;
    float twinkle = 0.6 + 0.25 * sin(t) + 0.15 * sin(t * 2.7 + aPhase * 3.0);
    float glint = pow(max(0.0, sin(uTime * 0.35 * aRate + aPhase * 7.0)), 60.0);
    float flicker = mix(1.0, twinkle, uTwinkle) + glint * uTwinkle * 1.2;

    float farSide = clamp((depth - 2.5) / 5.0, 0.0, 1.0);
    vAlpha = flicker * mix(0.5, 1.0, uNight) * mix(1.0, 0.45, farSide);
    vTint = aTint;

    gl_PointSize = uBaseSize * aSize * uPixelRatio
      * (1.0 + 0.3 * (flicker - 1.0)) * (5.0 / depth);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const starFragmentShader = `
  varying float vAlpha;
  varying vec3 vTint;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float core = smoothstep(0.35, 0.0, d);
    float halo = exp(-d * d * 6.0) * 0.6;
    float alpha = (core + halo) * vAlpha;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vTint * (core * 1.2 + halo), alpha);
  }
`;

function pickTint() {
  let roll = Math.random();
  for (const tint of STAR_TINTS) {
    if (roll < tint.weight) return tint.color;
    roll -= tint.weight;
  }
  return STAR_TINTS[0].color;
}

function StarGlobe({
  mouse,
  night,
  starCount,
  drift,
  reducedMotion,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
  night: NightRef;
  starCount: number;
  drift: boolean;
  reducedMotion: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const attributes = useMemo(() => {
    const position = new Float32Array(starCount * 3);
    const size = new Float32Array(starCount);
    const phase = new Float32Array(starCount);
    const rate = new Float32Array(starCount);
    const tint = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = SPHERE_RADIUS * (0.95 + Math.random() * 0.1);

      position[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      position[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      position[i * 3 + 2] = r * Math.cos(phi);

      // Mostly fine points with a small tail of clearly bright stars.
      size[i] = 0.8 + Math.pow(Math.random(), 6) * 3.5;
      phase[i] = Math.random() * Math.PI * 2;
      rate[i] = 0.6 + Math.random() * 1.8;

      const color = pickTint();
      tint[i * 3] = color.r;
      tint[i * 3 + 1] = color.g;
      tint[i * 3 + 2] = color.b;
    }

    return { position, size, phase, rate, tint };
  }, [starCount]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uNight: { value: 0 },
      uPixelRatio: { value: 1 },
      uBaseSize: { value: 2.8 },
      uTwinkle: { value: 1 },
    }),
    [],
  );

  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;

    const material = points.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uNight.value = night.current;
    material.uniforms.uPixelRatio.value = state.viewport.dpr;
    material.uniforms.uTwinkle.value = reducedMotion ? 0 : 1;

    if (drift) {
      const t = state.clock.elapsedTime * 0.15;
      targetRotation.current.x = Math.sin(t) * 0.12;
      targetRotation.current.y = Math.cos(t * 0.8) * 0.18;
    } else if (mouse.current) {
      targetRotation.current.x = mouse.current.y * 0.3;
      targetRotation.current.y = mouse.current.x * 0.3;
    }

    points.rotation.x +=
      (targetRotation.current.x - points.rotation.x) * 0.02;
    points.rotation.y +=
      (targetRotation.current.y - points.rotation.y) * 0.02;
    points.rotation.y += reducedMotion ? 0.0003 : 0.001;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[attributes.position, 3]}
        />
        <bufferAttribute attach="attributes-aSize" args={[attributes.size, 1]} />
        <bufferAttribute
          attach="attributes-aPhase"
          args={[attributes.phase, 1]}
        />
        <bufferAttribute attach="attributes-aRate" args={[attributes.rate, 1]} />
        <bufferAttribute attach="attributes-aTint" args={[attributes.tint, 3]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function DuneSky({
  night,
  reducedMotion,
}: {
  night: NightRef;
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uNight: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uDuskBg: { value: palette.duskBg.clone() },
      uNightBg: { value: palette.nightBg.clone() },
      uDusk: { value: palette.dusk.map((c) => c.clone()) },
      uNightCol: { value: palette.night.map((c) => c.clone()) },
    }),
    [],
  );

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const material = mesh.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = reducedMotion
      ? 0
      : state.clock.elapsedTime;
    material.uniforms.uNight.value = night.current;
    material.uniforms.uResolution.value.set(
      state.size.width * state.viewport.dpr,
      state.size.height * state.viewport.dpr,
    );
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[24, 12, 1, 1]} />
      <shaderMaterial
        vertexShader={duneVertexShader}
        fragmentShader={duneFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function GradientBackground() {
  const mouse = useRef({ x: 0, y: 0 });
  const night = useScrollNight();
  const reducedMotion = usePrefersReducedMotion();
  const [isLite, setIsLite] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setWebgl(supportsWebGL());
    const mq = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const update = () => setIsLite(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const handleVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-20" aria-hidden>
      <div className="dune-fallback absolute inset-0" />
      {webgl ? (
        <Canvas
          key={isLite ? "lite" : "full"}
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={isLite ? [1, 1.25] : [1, 1.75]}
          frameloop={visible ? "always" : "never"}
          gl={{ antialias: !isLite, alpha: false }}
          onCreated={() => setReady(true)}
          className={`transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          style={{ position: "absolute", inset: 0 }}
        >
          <DuneSky night={night} reducedMotion={reducedMotion} />
          <StarGlobe
            mouse={mouse}
            night={night}
            starCount={isLite ? 1200 : 5000}
            drift={isLite}
            reducedMotion={reducedMotion}
          />
        </Canvas>
      ) : null}
    </div>
  );
}
