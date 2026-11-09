import type { ParticleSpawn, Vector } from "~/scripts/assembly/minecraftParticles";
import { itemParticleVelocity } from "~/scripts/assembly/minecraftParticles";
import { BELT_TOP, CYCLE_TICKS, FILL_TICK, STATIONS, isSpoutDripping, pressHitTick } from "~/scripts/assembly/sturdySheetLine";

const BLOCK = 16;
const SPOUT_CENTRE: Vector = [8, 40, STATIONS.spout];
const BELT_CENTRE_Y = 8;

const spread = (random: () => number) => (random() - 0.5) * 2 * 0.125 * BLOCK;

// Create: SpoutBlockEntity drips one particle half a block under its centre at 0.1 blocks a tick.
const drip = (): ParticleSpawn => ({
	texture: "lava",
	position: [SPOUT_CENTRE[0], SPOUT_CENTRE[1] - BLOCK / 2, SPOUT_CENTRE[2]],
	velocity: [0, -0.1 * BLOCK, 0],
});

// Create: SpoutBlockEntity splashes 20 particles 2 - 5/16 blocks under its centre on filling.
const splash = (random: () => number): ParticleSpawn => ({
	texture: "lava",
	position: [SPOUT_CENTRE[0], SPOUT_CENTRE[1] - (2 - 5 / 16) * BLOCK, SPOUT_CENTRE[2]],
	velocity: [spread(random), Math.abs(spread(random)), spread(random)],
});

// Create: PressingBehaviour throws 15 pieces of the item from 1/4 block under the top of the belt's block centre,
// 0.125 blocks a tick up.
const crumb = (z: number, random: () => number): ParticleSpawn => ({
	texture: "unprocessedSheet",
	position: [8, BELT_CENTRE_Y + BLOCK / 2 - BLOCK / 4, z],
	velocity: itemParticleVelocity([spread(random), 0.125 * BLOCK, spread(random)], random),
});

const repeat = <T,>(count: number, make: () => T) => Array.from({ length: count }, make);

export const particlesSpawnedAt = (tick: number, random: () => number): ParticleSpawn[] => [
	...(isSpoutDripping(tick) ? [drip()] : []),
	...(tick === FILL_TICK ? repeat(20, () => splash(random)) : []),
	...(tick === pressHitTick("firstPress") ? repeat(15, () => crumb(STATIONS.firstPress, random)) : []),
	...(tick === pressHitTick("secondPress") ? repeat(15, () => crumb(STATIONS.secondPress, random)) : []),
];

const SPAWN_TICKS = new Set(
	Array.from({ length: CYCLE_TICKS }, (_, tick) => tick).filter((tick) => particlesSpawnedAt(tick, Math.random).length > 0),
);

export const nextSpawnTick = (after: number) => {
	for (let tick = after + 1; tick < after + CYCLE_TICKS; tick++) if (SPAWN_TICKS.has(tick % CYCLE_TICKS)) return tick;
	return after + CYCLE_TICKS;
};

export const lineFloorAt = (x: number, z: number) => (x >= 1 && x <= 15 && z >= 0 && z <= STATIONS.beltEnd ? BELT_TOP : 0);
