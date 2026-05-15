"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const SPHERE_RADIUS = 2.5;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uBgColor;
  varying vec2 vUv;

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
    vec2 uv = vUv;
    float time = uTime * 0.4;

    vec3 color = uBgColor;

    for (float i = 0.0; i < 6.0; i++) {
      float offset = i * 0.17;
      float speed = 0.8 + i * 0.15;

      float diagonal = uv.x + uv.y * 1.5 - time * speed + offset * 5.0;

      float streak = sin(diagonal * 3.0 + offset * 10.0) * 0.5 + 0.5;
      streak = pow(streak, 3.0);

      float n = noise(vec2(diagonal * 2.0, uv.y * 3.0 + time * 0.5));
      streak *= 0.5 + n * 0.5;

      float fade = sin(uv.y * 3.14159) * sin(uv.x * 3.14159);
      streak *= fade * 0.4;

      vec3 streakColor = mod(i, 2.0) < 1.0 ? uColor1 : uColor2;

      color = mix(color, streakColor, streak * 0.35);
    }

    float gradientMix = noise(uv * 2.0 + time * 0.1) * 0.1;
    color = mix(color, mix(uColor1, uColor2, uv.x), gradientMix);

    gl_FragColor = vec4(color, 1.0);
  }
`;

const colors = {
  bg: new THREE.Color("#121218"),
  color1: new THREE.Color("#82d173"),
  color2: new THREE.Color("#ff66cc"),
  particles: new THREE.Color("#F6F4F1"),
};

function createCircleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.3, "rgba(255,255,255,0.8)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);

  return new THREE.CanvasTexture(canvas);
}

function ParticleSphere({
  mouse,
  particleCount,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
  particleCount: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = SPHERE_RADIUS * (0.95 + Math.random() * 0.1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }

    return pos;
  }, [particleCount]);

  const circleTexture = useMemo(() => createCircleTexture(), []);

  const particleColor = colors.particles;

  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!pointsRef.current || !mouse.current) return;

    targetRotation.current.x = mouse.current.y * 0.3;
    targetRotation.current.y = mouse.current.x * 0.3;

    pointsRef.current.rotation.x +=
      (targetRotation.current.x - pointsRef.current.rotation.x) * 0.02;
    pointsRef.current.rotation.y +=
      (targetRotation.current.y - pointsRef.current.rotation.y) * 0.02;

    pointsRef.current.rotation.y += 0.001;
  });

  return (
    <points ref={pointsRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color={particleColor}
        map={circleTexture}
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GradientMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uBgColor: { value: colors.bg.clone() },
      uColor1: { value: colors.color1.clone() },
      uColor2: { value: colors.color2.clone() },
    };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} scale={[1, 1, 1]}>
      <planeGeometry args={[12, 12, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function Scene({
  mouse,
  particleCount,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
  particleCount: number;
}) {
  return (
    <>
      <GradientMesh />
      <ParticleSphere mouse={mouse} particleCount={particleCount} />
    </>
  );
}

export default function GradientBackground() {
  const mouse = useRef({ x: 0, y: 0 });
  const [particleCount, setParticleCount] = useState(5000);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);
      setParticleCount(mobile ? 1500 : 5000);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (isMobile) {
    return <StaticBackground />;
  }

  return (
    <div className="fixed inset-0 -z-20">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: false }}
      >
        <Scene mouse={mouse} particleCount={particleCount} />
      </Canvas>
    </div>
  );
}

function StaticBackground() {
  return (
    <div className="fixed inset-0 -z-20 bg-swiss-bg" aria-hidden />
  );
}
