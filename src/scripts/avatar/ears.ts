type Spring = { position: number; velocity: number };
export type Ear = { bone: string; outward: 1 | -1; pitch: Spring; lean: Spring };
type HeadMotion = { turn: number; nod: number };

const STIFFNESS = 0.3;
const DAMPING = 0.35;
const PITCH_PER_NOD = 0.6;
const LEAN_PER_TURN = 0.5;
const FLICK_CHANCE = 1 / 400;
const FLICK_PUSH = 25;
const WIGGLE_SPEED = 1.3;
const WIGGLE_ANGLE = 25;

const RESTING: Spring = { position: 0, velocity: 0 };

export const RESTING_EARS: Ear[] = [
	{ bone: "LeftCatEar", outward: 1, pitch: RESTING, lean: RESTING },
	{ bone: "RightCatEar", outward: -1, pitch: RESTING, lean: RESTING },
];

const stepSpring = (spring: Spring, target: number): Spring => {
	const velocity = spring.velocity * (1 - DAMPING) + (target - spring.position) * STIFFNESS;
	return { position: spring.position + velocity, velocity };
};

const pushSpring = (spring: Spring, amount: number): Spring => ({ ...spring, velocity: spring.velocity + amount });

export const stepEars = (ears: Ear[], motion: HeadMotion, wiggleTick: number | undefined, random: () => number): Ear[] => {
	const pitch = PITCH_PER_NOD * motion.nod;
	const lean = LEAN_PER_TURN * motion.turn;
	const flicked = random() < FLICK_CHANCE ? Math.floor(random() * ears.length) : -1;
	return ears.map((ear, index) => {
		const wiggle = wiggleTick === undefined ? 0 : Math.sin(wiggleTick * WIGGLE_SPEED + index + 1) * WIGGLE_ANGLE;
		const stepped = { ...ear, pitch: stepSpring(ear.pitch, pitch), lean: stepSpring(ear.lean, lean + wiggle * ear.outward) };
		return index === flicked ? { ...stepped, lean: pushSpring(stepped.lean, FLICK_PUSH * ear.outward) } : stepped;
	});
};
