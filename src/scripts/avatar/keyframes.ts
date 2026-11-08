import type { AnimationTracks, PositionKeyframe, Vector3 } from "~/scripts/avatar/types";
import { lerpVectors } from "~/scripts/avatar/math";

const ORIGIN: Vector3 = [0, 0, 0];

const smoothstep = (t: number) => t * t * (3 - 2 * t);

const samplePosition = (keyframes: PositionKeyframe[], time: number): Vector3 => {
	const nextIndex = keyframes.findIndex((keyframe) => keyframe.time >= time);
	const next = keyframes[nextIndex];
	const previous = keyframes[nextIndex - 1];
	if (!next) return keyframes.at(-1)?.position ?? ORIGIN;
	if (!previous) return next.position;
	const progress = (time - previous.time) / (next.time - previous.time);
	return lerpVectors(previous.position, next.position, previous.smooth || next.smooth ? smoothstep(progress) : progress);
};

export const sampleAnimation = (tracks: AnimationTracks, time: number): [string, Vector3][] =>
	Object.entries(tracks.bones).map(([bone, keyframes]) => [bone, samplePosition(keyframes, time)]);
