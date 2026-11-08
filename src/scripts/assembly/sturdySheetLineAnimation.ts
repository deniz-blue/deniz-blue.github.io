import type { Particle } from "~/scripts/assembly/minecraftParticles";
import { createParticle, particlePositionAt, tickParticle } from "~/scripts/assembly/minecraftParticles";
import type { ParticleTextures } from "~/scripts/assembly/particleCanvas";
import { clearParticleCanvas, drawParticle, loadParticleTexture } from "~/scripts/assembly/particleCanvas";
import {
	CYCLE_TICKS,
	MACHINE_TOP,
	STATIONS,
	STILL_FRAME_TICK,
	TICKS_PER_SECOND,
	itemAt,
	nozzleLift,
	pressHeadDrop,
	spoutLevel,
	spoutStreamWidth,
} from "~/scripts/assembly/sturdySheetLine";
import { lineFloorAt, particlesSpawnedAt } from "~/scripts/assembly/sturdySheetLineParticles";
import { prefersReducedMotion } from "~/scripts/motion";

const PART_NAMES = ["item", "first-press-head", "second-press-head", "stream", "nozzle-middle", "nozzle-bottom", "spout-lava"] as const;
const LAYER_NAMES = ["behind", "inside", "front"] as const;
type Parts = Record<(typeof PART_NAMES)[number], HTMLElement>;
type LayerName = (typeof LAYER_NAMES)[number];
type ParticleCanvases = { layers: Record<LayerName, HTMLCanvasElement>; textures: ParticleTextures; pixelsPerUnit: number };

const PRESS_HEAD_FRONT = 3;
const SPOUT_TANK_HEIGHT = 11;
const MAX_CATCH_UP_TICKS = 40;
// Create: FluidStackParticle draws fluids at 0.8 brightness.
const FLUID_PARTICLE_BRIGHTNESS = 0.8;

const units = (value: number) => `calc(var(--unit) * ${value})`;

const find = <Name extends string, Found extends HTMLElement = HTMLElement>(
	machine: HTMLElement,
	attribute: string,
	names: readonly Name[],
) =>
	Object.fromEntries(
		names.map((name) => {
			const element = machine.querySelector<Found>(`[${attribute}="${name}"]`);
			if (!element) throw new Error(`sturdy sheet line has no ${attribute}=${name}`);
			return [name, element];
		}),
	) as Record<Name, Found>;

const showSpout = (parts: Parts, tick: number) => {
	const width = spoutStreamWidth(tick);
	parts.stream.style.setProperty("--left", `${STATIONS.spout - width / 2}`);
	parts.stream.style.setProperty("--width", `${width}`);
	parts["nozzle-middle"].style.translate = `0 ${units(-nozzleLift(tick))}`;
	parts["nozzle-bottom"].style.translate = `0 ${units(-2 * nozzleLift(tick))}`;
	parts["spout-lava"].style.clipPath = `inset(${units(SPOUT_TANK_HEIGHT * (1 - spoutLevel(tick)))} 0 0 0)`;
};

const showMachine = (parts: Parts, tick: number) => {
	const item = itemAt(tick);
	parts.item.style.translate = `${units(item.z - STATIONS.start)} 0`;
	parts.item.style.opacity = `${item.opacity}`;
	parts.item.dataset.stage = item.stage;
	parts["first-press-head"].style.translate = `0 ${units(pressHeadDrop("firstPress", tick))}`;
	parts["second-press-head"].style.translate = `0 ${units(pressHeadDrop("secondPress", tick))}`;
	showSpout(parts, tick);
};

const layerAt = (x: number): LayerName => (x >= 8 ? "behind" : x >= PRESS_HEAD_FRONT ? "inside" : "front");

const loadTextures = async (machine: HTMLElement): Promise<ParticleTextures> => {
	const [lava, unprocessedSheet] = await Promise.all([
		loadParticleTexture(machine.dataset.lavaTexture ?? "", FLUID_PARTICLE_BRIGHTNESS),
		loadParticleTexture(machine.dataset.unprocessedSheetTexture ?? "", 1),
	]);
	return { lava, unprocessedSheet };
};

const drawParticles = ({ layers, textures, pixelsPerUnit }: ParticleCanvases, particles: Particle[], partialTick: number) => {
	const contexts = {
		behind: clearParticleCanvas(layers.behind, pixelsPerUnit),
		inside: clearParticleCanvas(layers.inside, pixelsPerUnit),
		front: clearParticleCanvas(layers.front, pixelsPerUnit),
	};
	for (const particle of particles) {
		const [x, y, z] = particlePositionAt(particle, partialTick);
		const half = particle.size / 2;
		drawParticle(contexts[layerAt(x)], textures[particle.texture], particle, z - half, MACHINE_TOP - y - half);
	}
};

const advanceParticles = (particles: Particle[], tick: number) => [
	...particles.filter((particle) => tickParticle(particle, lineFloorAt)),
	...particlesSpawnedAt(tick % CYCLE_TICKS, Math.random).map((spawn) => createParticle(spawn, Math.random)),
];

export const animateSturdySheetLine = async (machine: HTMLElement) => {
	const parts: Parts = find(machine, "data-part", PART_NAMES);
	if (prefersReducedMotion()) return showMachine(parts, STILL_FRAME_TICK);
	const canvases: ParticleCanvases = {
		layers: find<LayerName, HTMLCanvasElement>(machine, "data-particles", LAYER_NAMES),
		textures: await loadTextures(machine),
		pixelsPerUnit: parseFloat(getComputedStyle(machine).getPropertyValue("--unit")),
	};
	const startedAt = performance.now();
	let particles: Particle[] = [];
	let tick = 0;
	const frame = (now: number) => {
		const elapsed = ((now - startedAt) / 1000) * TICKS_PER_SECOND;
		if (elapsed - tick > MAX_CATCH_UP_TICKS) [particles, tick] = [[], Math.floor(elapsed)];
		while (tick < Math.floor(elapsed)) particles = advanceParticles(particles, ++tick);
		showMachine(parts, elapsed % CYCLE_TICKS);
		drawParticles(canvases, particles, elapsed - tick);
		requestAnimationFrame(frame);
	};
	requestAnimationFrame(frame);
};
