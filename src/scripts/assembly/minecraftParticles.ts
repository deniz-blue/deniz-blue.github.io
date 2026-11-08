export type Vector = [x: number, y: number, z: number];
export type ParticleTexture = "lava" | "unprocessedSheet";
export type ParticleSpawn = { texture: ParticleTexture; position: Vector; velocity: Vector };

export type Particle = ParticleSpawn & {
	previous: Vector;
	age: number;
	lifetime: number;
	size: number;
	crop: [u: number, v: number];
	onGround: boolean;
};

const BLOCK = 16;
// Minecraft: Particle.tick pulls gravity-1 particles down 0.04 blocks a tick², keeps 0.98 of their speed,
// and 0.7 of their sideways speed while on the ground.
const GRAVITY = 0.04 * BLOCK;
const AIR_FRICTION = 0.98;
const GROUND_FRICTION = 0.7;

// Minecraft: a particle lives 4 / (random * 0.9 + 0.1) ticks; item and fluid particles are 0.1 to 0.2 blocks
// wide and show a random quarter of their texture.
export const createParticle = (spawn: ParticleSpawn, random: () => number): Particle => ({
	...spawn,
	previous: [...spawn.position],
	age: 0,
	lifetime: Math.floor(4 / (random() * 0.9 + 0.1)),
	size: (random() * 0.5 + 0.5) * 0.2 * BLOCK,
	crop: [random() * 3, random() * 3],
	onGround: false,
});

// Minecraft: an item particle keeps a tenth of the random push every particle starts with.
export const itemParticleVelocity = ([x, y, z]: Vector, random: () => number): Vector => {
	const push: Vector = [random() * 2 - 1, random() * 2 - 1, random() * 2 - 1].map((value) => value * 0.4) as Vector;
	const length = Math.hypot(...push) || 1;
	const speed = (random() + random() + 1) * 0.15 * 0.4;
	const [px, py, pz] = push.map((value) => ((value / length) * speed * BLOCK) / 10);
	return [x + (px ?? 0), y + (py ?? 0) + (0.1 * BLOCK) / 10, z + (pz ?? 0)];
};

const move = (particle: Particle, floorAt: (x: number, z: number) => number) => {
	const [x, y, z] = particle.position;
	const [dx, dy, dz] = particle.velocity;
	const floor = floorAt(x + dx, z + dz);
	const landed = y >= floor && y + dy < floor;
	particle.position = [x + dx, landed ? floor : y + dy, z + dz];
	particle.onGround = landed;
};

export const tickParticle = (particle: Particle, floorAt: (x: number, z: number) => number) => {
	particle.previous = [...particle.position];
	if (particle.age++ >= particle.lifetime) return false;
	particle.velocity[1] -= GRAVITY;
	move(particle, floorAt);
	particle.velocity = particle.velocity.map((value) => value * AIR_FRICTION) as Vector;
	if (particle.onGround) {
		particle.velocity[0] *= GROUND_FRICTION;
		particle.velocity[2] *= GROUND_FRICTION;
	}
	return true;
};

export const particlePositionAt = (particle: Particle, partialTick: number): Vector =>
	particle.position.map((value, axis) => {
		const previous = particle.previous[axis] ?? value;
		return previous + (value - previous) * partialTick;
	}) as Vector;
