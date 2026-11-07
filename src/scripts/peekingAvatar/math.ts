import type { Vector3 } from "~/avatar/types";

export type Point = { x: number; y: number };

export const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const addVectors = (a: Vector3, b: Vector3): Vector3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const lerpVectors = (a: Vector3, b: Vector3, t: number): Vector3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
