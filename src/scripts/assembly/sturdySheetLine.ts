export const TICKS_PER_SECOND = 20;
const RPM = 48;
export const TURN_SECONDS = 60 / RPM;

// Create: belts carry items rpm / 480 blocks a tick, and BeltRenderer scrolls one texture loop every 504 / rpm ticks.
const BELT_UNITS_PER_TICK = (RPM / 480) * 16;
export const BELT_UNITS_PER_SECOND = BELT_UNITS_PER_TICK * TICKS_PER_SECOND;
export const BELT_LOOP_SECONDS = 504 / RPM / TICKS_PER_SECOND;

// Create: SpoutBlockEntity counts FILLING_TIME down to -1 and fills the item at 5.
const FILLING_TIME = 20;
const FILLS_AT = 5;
// Create: PressingBehaviour runs a 240 tick cycle at lerp(rpm / 512, 1, 60) a tick; on a belt the head travels 19/16 blocks.
const PRESS_CYCLE = 240;
const PRESS_STEP = Math.floor(1 + Math.min(RPM / 512, 1) * 59);
const PRESS_HEAD_TRAVEL = 19;

export const MACHINE_TOP = 66;
export const BELT_TOP = 13;
export const STATIONS = { start: 8, spout: 24, firstPress: 40, secondPress: 56, beltEnd: 80 };
// Create: a belt funnel takes an item as it crosses the middle of the belt segment under it.
const FUNNEL_INTAKE_Z = STATIONS.beltEnd - 8;

const ride = (from: number, to: number) => Math.ceil((to - from) / BELT_UNITS_PER_TICK);

const PHASES = [
	{ name: "appear", ticks: 6 },
	{ name: "toSpout", ticks: ride(STATIONS.start, STATIONS.spout) },
	{ name: "spout", ticks: FILLING_TIME + 1 },
	{ name: "toFirstPress", ticks: ride(STATIONS.spout, STATIONS.firstPress) },
	{ name: "firstPress", ticks: PRESS_CYCLE / PRESS_STEP },
	{ name: "toSecondPress", ticks: ride(STATIONS.firstPress, STATIONS.secondPress) },
	{ name: "secondPress", ticks: PRESS_CYCLE / PRESS_STEP },
	{ name: "toFunnel", ticks: ride(STATIONS.secondPress, FUNNEL_INTAKE_Z) },
] as const;

type PhaseName = (typeof PHASES)[number]["name"];
type PressName = "firstPress" | "secondPress";
type ItemStage = "powder" | "unprocessed" | "finished";
type ItemState = { z: number; opacity: number; stage: ItemStage };

export const CYCLE_TICKS = PHASES.reduce((total, { ticks }) => total + ticks, 0);

const startOf = (name: PhaseName) =>
	PHASES.slice(0, PHASES.findIndex((phase) => phase.name === name)).reduce((total, { ticks }) => total + ticks, 0);

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const interpolate = (points: [tick: number, value: number][], tick: number) => {
	const next = points.findIndex(([at]) => at > tick);
	if (next <= 0) return points[next === 0 ? 0 : points.length - 1]?.[1] ?? 0;
	const [fromTick, from] = points[next - 1] ?? [0, 0];
	const [toTick, to] = points[next] ?? [0, 0];
	return from + ((to - from) * (tick - fromTick)) / (toTick - fromTick);
};

export const STILL_FRAME_TICK = startOf("toFunnel") + 2;
export const FILL_TICK = startOf("spout") + FILLING_TIME - FILLS_AT;
export const pressHitTick = (press: PressName) => startOf(press) + PRESS_CYCLE / 2 / PRESS_STEP;

const ITEM_Z: [number, number][] = [
	[startOf("toSpout"), STATIONS.start],
	[startOf("spout"), STATIONS.spout],
	[startOf("toFirstPress"), STATIONS.spout],
	[startOf("firstPress"), STATIONS.firstPress],
	[startOf("toSecondPress"), STATIONS.firstPress],
	[startOf("secondPress"), STATIONS.secondPress],
	[startOf("toFunnel"), STATIONS.secondPress],
	[CYCLE_TICKS, FUNNEL_INTAKE_Z],
];

const stageAt = (tick: number): ItemStage =>
	tick < FILL_TICK ? "powder" : tick < pressHitTick("secondPress") ? "unprocessed" : "finished";

export const itemAt = (tick: number): ItemState => ({
	z: interpolate(ITEM_Z, tick),
	opacity: Math.min(1, tick / startOf("toSpout")),
	stage: stageAt(tick),
});

export const pressHeadDrop = (press: PressName, tick: number) => {
	const running = (tick - startOf(press)) * PRESS_STEP;
	if (running < 0 || running > PRESS_CYCLE) return 0;
	const extension =
		running < (PRESS_CYCLE * 2) / 3 ? ((running / PRESS_CYCLE) * 2) ** 3 : ((PRESS_CYCLE - running) / PRESS_CYCLE) * 3;
	return clamp(extension, 0, 1) * PRESS_HEAD_TRAVEL;
};

const processingTicks = (tick: number) => {
	const elapsed = tick - startOf("spout");
	return elapsed >= 0 && elapsed < FILLING_TIME + 1 ? FILLING_TIME - elapsed : undefined;
};

const streamRadius = (processing: number) => (2 * clamp(1 - (processing - FILLS_AT) / 10, 0, 1) - 1) ** 2 - 1;

const squeeze = (processing: number) =>
	processing < 0 ? 0 : processing < 2 ? -processing / 2 : processing < 10 ? -1 : streamRadius(processing);

export const isSpoutDripping = (tick: number) => (processingTicks(tick) ?? -1) >= 8;

export const spoutStreamWidth = (tick: number) => {
	const processing = processingTicks(tick);
	return processing === undefined ? 0 : Math.abs(streamRadius(processing));
};

// Create: SpoutRenderer lifts each nozzle piece 3/32 blocks per unit of squeeze over the piece above it.
export const nozzleLift = (tick: number) => {
	const processing = processingTicks(tick);
	return processing === undefined ? 0 : -1.5 * squeeze(processing);
};

const SPOUT_CAPACITY = 1000;
const FILL_AMOUNT = 500;
// Create: a pump's pressure is its rpm, and FluidNetwork moves max(1, pressure / 2) mB a tick.
const PUMP_MB_PER_TICK = Math.max(1, Math.floor(RPM / 2));
// Create: SmartFluidTankBehaviour moves the shown level a quarter of the way to the real one each tick,
// and SpoutRenderer never shows less than 0.175 of the tank.
const LEVEL_CHASE = 0.25;
const MIN_SHOWN_LEVEL = 0.175;

const simulateSpoutLevels = () => {
	const levels: number[] = [];
	let amount = SPOUT_CAPACITY;
	let shown = 1;
	for (let tick = 0; tick < CYCLE_TICKS * 2; tick++) {
		amount = tick % CYCLE_TICKS === FILL_TICK ? amount - FILL_AMOUNT : Math.min(SPOUT_CAPACITY, amount + PUMP_MB_PER_TICK);
		shown += (amount / SPOUT_CAPACITY - shown) * LEVEL_CHASE;
		if (tick >= CYCLE_TICKS) levels.push(shown);
	}
	return levels;
};

const spoutLevels = simulateSpoutLevels();
const SPOUT_LEVELS: [number, number][] = [...spoutLevels, spoutLevels[0] ?? 1].map((level, tick) => [tick, level]);

export const spoutLevel = (tick: number) => Math.max(MIN_SHOWN_LEVEL, interpolate(SPOUT_LEVELS, tick));
