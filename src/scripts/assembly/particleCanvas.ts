import type { Particle, ParticleTexture } from "~/scripts/assembly/minecraftParticles";

export type ParticleTextures = Record<ParticleTexture, HTMLCanvasElement>;

export const loadParticleTexture = async (src: string, brightness: number) => {
	const image = new Image();
	image.src = src;
	await image.decode();
	const texture = Object.assign(document.createElement("canvas"), { width: image.naturalWidth, height: image.naturalHeight });
	const context = texture.getContext("2d");
	if (!context) return texture;
	context.drawImage(image, 0, 0);
	context.globalCompositeOperation = "source-atop";
	context.fillStyle = `rgb(0 0 0 / ${1 - brightness})`;
	context.fillRect(0, 0, texture.width, texture.height);
	return texture;
};

export const clearParticleCanvas = (canvas: HTMLCanvasElement, pixelsPerUnit: number) => {
	const width = Math.round(canvas.clientWidth * devicePixelRatio);
	const height = Math.round(canvas.clientHeight * devicePixelRatio);
	if (canvas.width !== width || canvas.height !== height) Object.assign(canvas, { width, height });
	const context = canvas.getContext("2d");
	if (!context) throw new Error("particle canvas has no 2d context");
	const scale = pixelsPerUnit * devicePixelRatio;
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, width, height);
	context.setTransform(scale, 0, 0, scale, 0, 0);
	context.imageSmoothingEnabled = false;
	return context;
};

export const drawParticle = (
	context: CanvasRenderingContext2D,
	texture: HTMLCanvasElement,
	{ crop: [u, v], size }: Particle,
	left: number,
	top: number,
) => {
	const cropSize = texture.width / 4;
	context.drawImage(texture, u * cropSize, v * cropSize, cropSize, cropSize, left, top, size, size);
};
