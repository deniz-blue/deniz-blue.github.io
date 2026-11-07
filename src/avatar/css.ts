import type { AvatarFace } from "~/avatar/types";

export const PIXELS_PER_UNIT = 8;

const hundredths = (value: number) => Math.round(value * 100) / 100;

export const cssPixels = (units: number) => `${hundredths(units * PIXELS_PER_UNIT)}px`;
export const cssDegrees = (degrees: number) => `${hundredths(degrees)}deg`;

export const poseVariable = (bone: string) => `--pose-${bone.replace(/\W/g, "")}`;

export const faceTextureClass = (face: Pick<AvatarFace, "texture" | "direction">) => `avatar-texture-${face.texture}-${face.direction}`;
