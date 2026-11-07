import { TICK_SECONDS } from "~/scripts/peekingAvatar/ticks";

type BlinkStep = { tick: number; petted: boolean; length: number; random: () => number };

const CHECK_TICKS = 7;
const CHANCE = 0.05;

const startsBlinking = ({ tick, petted, random }: BlinkStep) => petted || (tick % CHECK_TICKS === 0 && random() < CHANCE);

const closingSeconds = (seconds: number, length: number) => (seconds > length / 2 ? length - seconds : seconds);

export const stepBlink = (seconds: number | undefined, step: BlinkStep): number | undefined => {
	if (seconds === undefined) return startsBlinking(step) ? 0 : undefined;
	if (step.petted) return Math.min(closingSeconds(seconds, step.length) + TICK_SECONDS, step.length / 2);
	return seconds >= step.length ? undefined : seconds + TICK_SECONDS;
};
