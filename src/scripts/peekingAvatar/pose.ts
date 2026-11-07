import { cssDegrees, cssPixels, poseVariable } from "~/avatar/css";
import type { Vector3 } from "~/avatar/types";
import { PEEKING_AVATAR_ANIMATIONS } from "~/assets/avatar/peekingAvatarAnimations";
import { sampleAnimation } from "~/scripts/peekingAvatar/keyframes";
import { addVectors, lerp, type Point } from "~/scripts/peekingAvatar/math";
import type { SimulationState } from "~/scripts/peekingAvatar/simulation";

const { lookHorizontal, lookVertical, blink } = PEEKING_AVATAR_ANIMATIONS;

const blinkSecondsAt = (previous: SimulationState, current: SimulationState, delta: number) =>
	current.blinkSeconds === undefined ? blink.length : lerp(previous.blinkSeconds ?? 0, current.blinkSeconds, delta);

const boneOffsets = (eye: Point, blinkSeconds: number) =>
	[
		...sampleAnimation(lookHorizontal, ((eye.x + 1) / 2) * lookHorizontal.length),
		...sampleAnimation(lookVertical, ((1 - eye.y) / 2) * lookVertical.length),
		...sampleAnimation(blink, blinkSeconds),
	].reduce(
		(offsets, [bone, offset]) => new Map(offsets).set(bone, addVectors(offsets.get(bone) ?? [0, 0, 0], offset)),
		new Map<string, Vector3>(),
	);

const translate = ([x, y, z]: Vector3) => `translate3d(${cssPixels(-x)},${cssPixels(-y)},${cssPixels(-z)})`;

export const poseValues = (previous: SimulationState, current: SimulationState, delta: number): [string, string][] => {
	const head = { yaw: lerp(previous.head.yaw, current.head.yaw, delta), pitch: lerp(previous.head.pitch, current.head.pitch, delta) };
	const eye = { x: lerp(previous.eye.x, current.eye.x, delta), y: lerp(previous.eye.y, current.eye.y, delta) };
	const offsets = [...boneOffsets(eye, blinkSecondsAt(previous, current, delta))];
	const ears = current.ears.map((ear, index): [string, string] => {
		const before = previous.ears[index] ?? ear;
		const lean = lerp(before.lean.position, ear.lean.position, delta);
		const pitch = lerp(before.pitch.position, ear.pitch.position, delta);
		return [poseVariable(ear.bone), `rotateZ(${cssDegrees(lean)}) rotateX(${cssDegrees(pitch)})`];
	});
	return [
		[poseVariable("Head"), `rotateY(${cssDegrees(head.yaw)}) rotateX(${cssDegrees(head.pitch)})`],
		...offsets.map(([bone, offset]): [string, string] => [poseVariable(bone), translate(offset)]),
		...ears,
	];
};
