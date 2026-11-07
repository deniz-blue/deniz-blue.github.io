export type Heart = {
	id: number;
	x: number;
	y: number;
	rise: number;
	size: number;
	age: number;
	behind: boolean;
};
export type HeartArea = { centerX: number; top: number; bottom: number };

const BLOCK = 16;
// Minecraft's heart particle lives 16 ticks, starts rising at 0.1 blocks a tick and keeps
// 86% of its speed each tick. Taming and breeding scatter them up to one player width
// (0.6 blocks) to either side, in front and behind.
const LIFETIME_TICKS = 16;
const RISE = 0.1 * BLOCK;
const FRICTION = 0.86;
const HEARTS_PER_PET = 4;
const SPREAD = 0.6 * BLOCK;
const LARGEST_SIZE = 3.5;
const MAX_HEARTS = 28;

export const spawnHearts = (firstId: number, area: HeartArea, random: () => number): Heart[] =>
	Array.from({ length: HEARTS_PER_PET }, (_, index) => {
		const y = area.top + random() * (area.bottom - area.top);
		const x = area.centerX + (random() * 2 - 1) * SPREAD;
		const size = LARGEST_SIZE * (0.5 + random() * 0.5);
		return { id: firstId + index, x, y, rise: RISE, size, age: 0, behind: random() < 0.5 };
	});

export const addHearts = (hearts: Heart[], spawned: Heart[]) => [...hearts, ...spawned].slice(-MAX_HEARTS);

export const stepHearts = (hearts: Heart[]): Heart[] =>
	hearts
		.map((heart) => ({ ...heart, y: heart.y - heart.rise, rise: heart.rise * FRICTION, age: heart.age + 1 }))
		.filter((heart) => heart.age < LIFETIME_TICKS);
