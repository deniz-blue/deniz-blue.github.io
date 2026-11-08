type Point = { x: number; y: number };
type Mark = { filled: boolean; path: string };
type Paper = Point & { size: number; tilt: number; tone: string; mark?: Mark };
type MarkShape = { filled: boolean; path: (size: number) => string };

export const EVIDENCE_BOARD_VIEW_BOX = "60 10 480 80";

export const PINS = [
	{ x: 100, y: 30, tilt: -8 },
	{ x: 185, y: 66, tilt: 6 },
	{ x: 265, y: 24, tilt: -4 },
	{ x: 345, y: 62, tilt: 9 },
	{ x: 425, y: 28, tilt: -6 },
	{ x: 505, y: 42, tilt: 5 },
];

const LINKS = [
	[0, 1],
	[0, 2],
	[1, 2],
	[2, 3],
	[2, 4],
	[3, 4],
	[3, 5],
	[4, 5],
] as const;

const LOOSE_ENDS = [
	{ pin: 0, x: -20, y: -10 },
	{ pin: 0, x: 30, y: 130 },
	{ pin: 1, x: 120, y: 140 },
	{ pin: 2, x: 210, y: -40 },
	{ pin: 2, x: 330, y: -40 },
	{ pin: 3, x: 300, y: 140 },
	{ pin: 4, x: 470, y: -40 },
	{ pin: 5, x: 620, y: 10 },
	{ pin: 5, x: 600, y: 130 },
];

const LAYERS = [
	{ scrollRate: 0.15, minSize: 8, maxSize: 14 },
	{ scrollRate: 0.09, minSize: 14, maxSize: 20 },
	{ scrollRate: 0.04, minSize: 20, maxSize: 27 },
];

const PAPER_TONES = ["#3c3a66", "#4a4878", "#5d5a8c", "#6f6ca3", "#807db5"];
const MARK_SHAPES: (MarkShape | undefined)[] = [
	{ filled: true, path: (s) => `M${-s * 0.3} ${-s * 0.45}h${s * 0.6}v${s * 0.5}h${-s * 0.6}Z` },
	{ filled: false, path: (s) => `M${-s * 0.3} ${-s * 0.3}h${s * 0.6}M${-s * 0.3} 0h${s * 0.4}` },
	{ filled: false, path: (s) => `M${-s * 0.2} ${-s * 0.2}l${s * 0.4} ${s * 0.4}m0 ${-s * 0.4}l${-s * 0.4} ${s * 0.4}` },
	undefined,
];
const PAPER_COUNT = 170;
const SAG_PER_LENGTH = 0.15;

const seededRandom = (seed: number) => () => {
	seed = (seed + 0x6d2b79f5) | 0;
	let mixed = Math.imul(seed ^ (seed >>> 15), seed | 1);
	mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
	return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
};

const random = seededRandom(9);
const between = (min: number, max: number) => min + random() * (max - min);
const pick = <T>(items: readonly T[]) => items[Math.floor(random() * items.length)]!;

const randomPaper = (): Paper => {
	const x = between(0, 600);
	const y = between(-55, 155);
	const size = between(LAYERS[0]!.minSize, LAYERS.at(-1)!.maxSize);
	const tilt = between(-35, 35);
	const tone = pick(PAPER_TONES);
	const shape = pick(MARK_SHAPES);
	return { x, y, size, tilt, tone, mark: shape && { filled: shape.filled, path: shape.path(size) } };
};

const papers = Array.from({ length: PAPER_COUNT }, randomPaper).toSorted((a, b) => a.size - b.size);

export const paperLayers = LAYERS.map(({ scrollRate, minSize, maxSize }) => ({
	scrollRate,
	papers: papers.filter(({ size }) => size >= minSize && size < maxSize),
}));

const sagging = (a: Point, b: Point) => {
	const sag = Math.hypot(b.x - a.x, b.y - a.y) * SAG_PER_LENGTH;
	return `M${a.x} ${a.y}Q${(a.x + b.x) / 2} ${(a.y + b.y) / 2 + sag} ${b.x} ${b.y}`;
};

export const stringPaths = [
	...LINKS.map(([from, to]) => sagging(PINS[from]!, PINS[to]!)),
	...LOOSE_ENDS.map(({ pin, x, y }) => sagging(PINS[pin]!, { x, y })),
];
