import sharp from "sharp";
import type { FaceDirection } from "~/avatar/types";
import type { Uv } from "./blockbench.ts";

export type DecodedTexture = { pixels: Uint8Array; width: number; height: number };
export type Resolution = { width: number; height: number };

export const FACE_BRIGHTNESS: Record<FaceDirection, number> = {
	north: 1,
	up: 0.92,
	east: 0.78,
	west: 0.78,
	south: 0.7,
	down: 0.55,
};

export const decodeTexture = async (dataUrl: string): Promise<DecodedTexture> => {
	const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
	const { data, info } = await sharp(Buffer.from(base64, "base64"))
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });
	return { pixels: new Uint8Array(data), width: info.width, height: info.height };
};

const range = (from: number, to: number) => Array.from({ length: Math.max(0, to - from) }, (_, index) => from + index);

const regionPixels = (texture: DecodedTexture, resolution: Resolution, [u1, v1, u2, v2]: Uv) => {
	const scaleX = texture.width / resolution.width;
	const scaleY = texture.height / resolution.height;
	const columns = range(Math.floor(Math.min(u1, u2) * scaleX), Math.ceil(Math.max(u1, u2) * scaleX));
	const rows = range(Math.floor(Math.min(v1, v2) * scaleY), Math.ceil(Math.max(v1, v2) * scaleY));
	return rows.flatMap((y) => columns.map((x) => y * texture.width + x));
};

export const isRegionTransparent = (texture: DecodedTexture, resolution: Resolution, uv: Uv) =>
	regionPixels(texture, resolution, uv).every((pixel) => (texture.pixels[pixel * 4 + 3] ?? 0) === 0);

export const clearOutsideRegions = (texture: DecodedTexture, resolution: Resolution, uvs: Uv[]): DecodedTexture => {
	const kept = new Set(uvs.flatMap((uv) => regionPixels(texture, resolution, uv)));
	return { ...texture, pixels: texture.pixels.map((value, index) => (kept.has(Math.floor(index / 4)) ? value : 0)) };
};

export const shadedTextureUrl = async (texture: DecodedTexture, brightness: number) => {
	const shaded = texture.pixels.map((value, index) => (index % 4 === 3 ? value : Math.round(value * brightness)));
	const png = await sharp(shaded, { raw: { width: texture.width, height: texture.height, channels: 4 } })
		.png({ compressionLevel: 9 })
		.toBuffer();
	return `data:image/png;base64,${png.toString("base64")}`;
};
