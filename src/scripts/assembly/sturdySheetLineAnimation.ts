import type { Particle } from "~/scripts/assembly/minecraftParticles";
import { createParticle, particlePositionAt, tickParticle } from "~/scripts/assembly/minecraftParticles";
import type { ParticleTextures } from "~/scripts/assembly/particleCanvas";
import { clearParticleCanvas, drawParticle, loadParticleTexture } from "~/scripts/assembly/particleCanvas";
import { CYCLE_TICKS, MACHINE_TOP, TICKS_PER_SECOND } from "~/scripts/assembly/sturdySheetLine";
import { keyframesName } from "~/scripts/assembly/sturdySheetLineKeyframes";
import { lineFloorAt, nextSpawnTick, particlesSpawnedAt } from "~/scripts/assembly/sturdySheetLineParticles";
import { prefersReducedMotion } from "~/scripts/motion";
import { watchOnScreen } from "~/scripts/onScreen";

const LAYER_NAMES = ["behind", "inside", "front"] as const;
type LayerName = (typeof LAYER_NAMES)[number];
type ParticleCanvases = { layers: Record<LayerName, HTMLCanvasElement>; textures: ParticleTextures; pixelsPerUnit: number };

const PRESS_HEAD_FRONT = 3;
const MAX_CATCH_UP_TICKS = 40;
// Create: FluidStackParticle draws fluids at 0.8 brightness.
const FLUID_PARTICLE_BRIGHTNESS = 0.8;

const findCanvases = (machine: HTMLElement) =>
	Object.fromEntries(
		LAYER_NAMES.map((name) => {
			const canvas = machine.querySelector<HTMLCanvasElement>(`[data-particles="${name}"]`);
			if (!canvas) throw new Error(`sturdy sheet line has no data-particles=${name}`);
			return [name, canvas];
		}),
	) as Record<LayerName, HTMLCanvasElement>;

const ticksPlayedBy = (machine: HTMLElement) => {
	const name = keyframesName("item-z");
	const animation = machine
		.getAnimations({ subtree: true })
		.find((running) => running instanceof CSSAnimation && running.animationName === name);
	if (!animation) throw new Error(`sturdy sheet line is not playing ${name}`);
	return () => (typeof animation.currentTime === "number" ? (animation.currentTime / 1000) * TICKS_PER_SECOND : 0);
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

export const animateSturdySheetLineParticles = async (machine: HTMLElement) => {
	if (prefersReducedMotion()) return;
	const ticksPlayed = ticksPlayedBy(machine);
	const canvases: ParticleCanvases = {
		layers: findCanvases(machine),
		textures: await loadTextures(machine),
		pixelsPerUnit: parseFloat(getComputedStyle(machine).getPropertyValue("--unit")),
	};
	let particles: Particle[] = [];
	let tick = Math.floor(ticksPlayed());
	let onScreen = false;
	let scheduled = false;

	const frame = () => {
		scheduled = false;
		if (!onScreen) return;
		const elapsed = ticksPlayed();
		if (elapsed - tick > MAX_CATCH_UP_TICKS) [particles, tick] = [[], Math.floor(elapsed)];
		while (tick < Math.floor(elapsed)) particles = advanceParticles(particles, ++tick);
		drawParticles(canvases, particles, elapsed - tick);
		schedule();
	};

	const schedule = () => {
		if (scheduled || !onScreen) return;
		scheduled = true;
		const spawn = nextSpawnTick(tick);
		const ticksToSpawn = spawn - ticksPlayed();
		if (particles.length === 0 && ticksToSpawn > 0) {
			setTimeout(() => {
				scheduled = false;
				schedule();
			}, (ticksToSpawn / TICKS_PER_SECOND) * 1000);
			return;
		}
		if (particles.length === 0) tick = spawn - 1;
		requestAnimationFrame(frame);
	};

	watchOnScreen(machine, (visible) => {
		machine.toggleAttribute("data-off-screen", !visible);
		onScreen = visible;
		schedule();
	});
};
