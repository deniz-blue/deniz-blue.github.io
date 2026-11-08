import { stepBlink } from "~/scripts/avatar/blink";
import { RESTING_EARS, stepEars, type Ear } from "~/scripts/avatar/ears";
import { STRAIGHT_AHEAD, eyeDirectionFor, headAnglesFor, type Angles } from "~/scripts/avatar/gaze";
import { addHearts, spawnHearts, stepHearts, type Heart, type HeartArea } from "~/scripts/avatar/hearts";
import { lerp, type Point } from "~/scripts/avatar/math";

export type SimulationState = {
	tick: number;
	head: Angles;
	eye: Point;
	ears: Ear[];
	petTicks: number;
	blinkSeconds: number | undefined;
	hearts: Heart[];
	heartsSpawned: number;
};

type SimulationInput = { toward: Angles; blinkLength: number; random: () => number };

const HEAD_EASING = 0.24;
const PET_TICKS = 10;

export const INITIAL_STATE: SimulationState = {
	tick: 0,
	head: STRAIGHT_AHEAD,
	eye: { x: 0, y: 0 },
	ears: RESTING_EARS,
	petTicks: 0,
	blinkSeconds: undefined,
	hearts: [],
	heartsSpawned: 0,
};

export const stepSimulation = (state: SimulationState, input: SimulationInput): SimulationState => {
	const target = headAnglesFor(input.toward);
	const head = { yaw: lerp(state.head.yaw, target.yaw, HEAD_EASING), pitch: lerp(state.head.pitch, target.pitch, HEAD_EASING) };
	// Minecraft's head yaw grows turning right and its pitch grows looking down.
	const motion = { turn: state.head.yaw - head.yaw, nod: state.head.pitch - head.pitch };
	const petted = state.petTicks > 0;
	return {
		tick: state.tick + 1,
		head,
		eye: eyeDirectionFor(input.toward, head),
		ears: stepEars(state.ears, motion, petted ? state.tick : undefined, input.random),
		petTicks: Math.max(state.petTicks - 1, 0),
		blinkSeconds: stepBlink(state.blinkSeconds, { tick: state.tick, petted, length: input.blinkLength, random: input.random }),
		hearts: stepHearts(state.hearts),
		heartsSpawned: state.heartsSpawned,
	};
};

export const petSimulation = (state: SimulationState, heartArea: HeartArea, random: () => number): SimulationState => {
	const spawned = spawnHearts(state.heartsSpawned, heartArea, random);
	return {
		...state,
		petTicks: PET_TICKS,
		hearts: addHearts(state.hearts, spawned),
		heartsSpawned: state.heartsSpawned + spawned.length,
	};
};
