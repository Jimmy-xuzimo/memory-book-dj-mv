import { Easing, interpolate } from "remotion";
import bass from "./data/bass-pulse.json";

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const ease = (v: number) => Easing.bezier(0.42, 0, 0.22, 1)(clamp(v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const range = (v: number, a: number, b: number) =>
  ease((v - a) / (b - a));
export const kf = (f: number, input: number[], output: number[]) =>
  interpolate(f, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.42, 0, 0.22, 1),
  });
export const wave = (f: number, period = 60, phase = 0) =>
  Math.sin((f / period) * Math.PI * 2 + phase);
export const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
export const pulse = (f: number) =>
  bass[Math.max(0, Math.min(2370, Math.round(f)))] || 0;
