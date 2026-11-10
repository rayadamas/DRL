"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { useScrollNight } from "@/lib/hooks";

const STORAGE_KEY = "drl-ambient-sound";
const FADE_SECONDS = 2;
const MASTER_LEVEL = 0.22;

type Engine = {
  ctx: AudioContext;
  master: GainNode;
  windFilter: BiquadFilterNode;
  windGain: GainNode;
  droneFilter: BiquadFilterNode;
  droneGain: GainNode;
};

function brownNoiseBuffer(ctx: AudioContext) {
  const length = ctx.sampleRate * 4;
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < length; i++) {
    last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
    data[i] = last * 3.5;
  }
  return buffer;
}

function createEngine(): Engine {
  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  const noise = ctx.createBufferSource();
  noise.buffer = brownNoiseBuffer(ctx);
  noise.loop = true;
  const windFilter = ctx.createBiquadFilter();
  windFilter.type = "bandpass";
  windFilter.frequency.value = 600;
  windFilter.Q.value = 0.8;
  const windGain = ctx.createGain();
  windGain.gain.value = 0.9;
  noise.connect(windFilter).connect(windGain).connect(master);

  // Slow gusts: an LFO sweeping the wind filter.
  const gust = ctx.createOscillator();
  gust.frequency.value = 0.07;
  const gustDepth = ctx.createGain();
  gustDepth.gain.value = 260;
  gust.connect(gustDepth).connect(windFilter.frequency);

  const droneFilter = ctx.createBiquadFilter();
  droneFilter.type = "lowpass";
  droneFilter.frequency.value = 420;
  const droneGain = ctx.createGain();
  droneGain.gain.value = 0.12;
  droneFilter.connect(droneGain).connect(master);
  [55, 82.4].forEach((frequency, i) => {
    const osc = ctx.createOscillator();
    osc.type = i === 0 ? "sine" : "triangle";
    osc.frequency.value = frequency;
    osc.detune.value = i === 0 ? -4 : 5;
    osc.connect(droneFilter);
    osc.start();
  });

  noise.start();
  gust.start();
  return { ctx, master, windFilter, windGain, droneFilter, droneGain };
}

export default function AmbientSound() {
  const [on, setOn] = useState(false);
  const wantOn = useRef(false);
  const engine = useRef<Engine | null>(null);
  const night = useScrollNight();

  const fadeTo = useCallback((level: number) => {
    const current = engine.current;
    if (!current) return;
    const now = current.ctx.currentTime;
    current.master.gain.cancelScheduledValues(now);
    current.master.gain.setValueAtTime(current.master.gain.value, now);
    current.master.gain.linearRampToValueAtTime(level, now + FADE_SECONDS);
  }, []);

  const start = useCallback(async () => {
    if (!engine.current) engine.current = createEngine();
    await engine.current.ctx.resume();
    if (wantOn.current) fadeTo(MASTER_LEVEL);
  }, [fadeTo]);

  const stop = useCallback(() => {
    const current = engine.current;
    if (!current) return;
    fadeTo(0);
    window.setTimeout(() => {
      if (!wantOn.current) void current.ctx.suspend();
    }, FADE_SECONDS * 1000 + 100);
  }, [fadeTo]);

  // Browsers only allow audio after a gesture, so a saved "on" waits for the first interaction.
  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) !== "on") return;
    wantOn.current = true;
    setOn(true);
    const resume = () => void start();
    window.addEventListener("pointerdown", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });
    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
  }, [start]);

  useEffect(() => {
    if (!on) return;
    const id = window.setInterval(() => {
      const current = engine.current;
      if (!current) return;
      const n = night.current;
      const now = current.ctx.currentTime;
      current.windGain.gain.setTargetAtTime(0.9 - n * 0.45, now, 0.5);
      current.windFilter.Q.setTargetAtTime(0.8 + n * 0.8, now, 0.5);
      current.droneGain.gain.setTargetAtTime(0.12 + n * 0.22, now, 0.5);
      current.droneFilter.frequency.setTargetAtTime(420 - n * 220, now, 0.5);
    }, 250);
    return () => window.clearInterval(id);
  }, [on, night]);

  useEffect(
    () => () => {
      void engine.current?.ctx.close();
    },
    [],
  );

  const toggle = () => {
    const next = !on;
    wantOn.current = next;
    setOn(next);
    window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    if (next) void start();
    else stop();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Turn ambient sound off" : "Turn ambient sound on"}
      title={on ? "Ambient sound on" : "Ambient sound off"}
      className={`fixed bottom-4 left-4 z-[998] flex h-11 items-center gap-2 rounded-full border px-4 text-xs font-medium backdrop-blur-md transition-colors sm:bottom-6 sm:left-6 ${
        on
          ? "border-swiss-accent/60 bg-swiss-bg/70 text-swiss-accent"
          : "border-swiss-border/60 bg-swiss-bg/60 text-swiss-text-secondary hover:text-swiss-text"
      }`}
    >
      {on ? (
        <HiSpeakerWave className="h-4 w-4" aria-hidden />
      ) : (
        <HiSpeakerXMark className="h-4 w-4" aria-hidden />
      )}
      <span className="hidden sm:inline">{on ? "Desert wind" : "Sound"}</span>
    </button>
  );
}
