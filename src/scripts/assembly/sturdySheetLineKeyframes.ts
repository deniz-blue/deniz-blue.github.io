import {
	CYCLE_TICKS,
	STATIONS,
	STILL_FRAME_TICK,
	TICKS_PER_SECOND,
	itemAt,
	nozzleLift,
	pressHeadDrop,
	spoutLevel,
	spoutStreamWidth,
} from "~/scripts/assembly/sturdySheetLine";

export const UNIT_PIXELS = 2;
export const SPOUT_TANK_HEIGHT = 11;

const CYCLE_SECONDS = CYCLE_TICKS / TICKS_PER_SECOND;
const TOLERANCE = 0.01;

type Track = {
	property: string;
	valueAt: (tick: number) => number;
	css: (value: number) => string;
	stepped?: boolean;
};

const round = (value: number, digits = 3) => Number(value.toFixed(digits));
const pixels = (units: number) => `${round(units * UNIT_PIXELS)}px`;
const down = (units: number) => `0 ${pixels(units)}`;

const shownWhileStage = (stage: ReturnType<typeof itemAt>["stage"]) => (tick: number) =>
	itemAt(tick).stage === stage ? 1 : 0;
const emptySpoutHeight = (tick: number) => SPOUT_TANK_HEIGHT * (1 - spoutLevel(tick));

const TRACKS = {
	"item-z": { property: "translate", valueAt: (tick) => itemAt(tick).z - STATIONS.start, css: (z) => `${pixels(z)} 0` },
	"item-opacity": { property: "opacity", valueAt: (tick) => itemAt(tick).opacity, css: (opacity) => `${round(opacity)}` },
	"item-powder": { property: "opacity", valueAt: shownWhileStage("powder"), css: String, stepped: true },
	"item-unprocessed": { property: "opacity", valueAt: shownWhileStage("unprocessed"), css: String, stepped: true },
	"item-finished": { property: "opacity", valueAt: shownWhileStage("finished"), css: String, stepped: true },
	"first-press-head": { property: "translate", valueAt: (tick) => pressHeadDrop("firstPress", tick), css: down },
	"second-press-head": { property: "translate", valueAt: (tick) => pressHeadDrop("secondPress", tick), css: down },
	stream: { property: "scale", valueAt: spoutStreamWidth, css: (width) => `${round(width)} 1` },
	"nozzle-middle": { property: "translate", valueAt: (tick) => -nozzleLift(tick), css: down },
	"nozzle-bottom": { property: "translate", valueAt: (tick) => -2 * nozzleLift(tick), css: down },
	"spout-level": { property: "translate", valueAt: emptySpoutHeight, css: down },
	"spout-lava": { property: "translate", valueAt: (tick) => -emptySpoutHeight(tick), css: down },
} satisfies Record<string, Track>;

type TrackName = keyof typeof TRACKS;

export const keyframesName = (track: TrackName) => `sturdy-sheet-${track}`;

const isStraight = (values: number[], from: number, to: number) =>
	values
		.slice(from + 1, to)
		.every(
			(value, index) =>
				Math.abs(value - (values[from]! + ((values[to]! - values[from]!) * (index + 1)) / (to - from))) <= TOLERANCE,
		);

const linearKeyframeTicks = (values: number[]) => {
	const ticks = [0];
	for (let tick = 2; tick < values.length; tick++) if (!isStraight(values, ticks.at(-1)!, tick)) ticks.push(tick - 1);
	return [...ticks, values.length - 1];
};

const steppedKeyframeTicks = (values: number[]) =>
	values.flatMap((value, tick) => (tick === 0 || tick === values.length - 1 || value !== values[tick - 1] ? [tick] : []));

const trackNamed = (name: TrackName): Track => TRACKS[name];

const keyframes = (name: TrackName) => {
	const track = trackNamed(name);
	const values = Array.from({ length: CYCLE_TICKS + 1 }, (_, tick) => track.valueAt(tick));
	const ticks = track.stepped ? steppedKeyframeTicks(values) : linearKeyframeTicks(values);
	const frames = ticks.map((tick) => `${round((tick / CYCLE_TICKS) * 100, 4)}% { ${track.property}: ${track.css(values[tick]!)} }`);
	return `@keyframes ${keyframesName(name)} { ${frames.join(" ")} }`;
};

export const sturdySheetLineKeyframes = () => (Object.keys(TRACKS) as TrackName[]).map(keyframes).join("\n");

const stillFrame = (track: Track) => `${track.property}: ${track.css(track.valueAt(STILL_FRAME_TICK))}`;
const animation = (name: TrackName) =>
	`${keyframesName(name)} ${CYCLE_SECONDS}s ${trackNamed(name).stepped ? "step-end" : "linear"} infinite`;

export const animationStyle = (...names: TrackName[]) =>
	[...names.map((name) => stillFrame(trackNamed(name))), `animation: ${names.map(animation).join(", ")}`].join("; ");
