import { vec2 } from "@alan404/vec2";
import { FarewellBackgroundEffect, StarfieldConfig } from "../../../background/starfield/impl/gl2/_FarewellBackgroundEffect";
import { Star, StaticStarfield } from "../../../background/starfield/impl/starfield";
import { createTextureStore, textureWithColor } from "./textureWithColor";
import { starTextureSources } from "../farewell/textures";
import { toRgba } from "@mantine/core";

const starTextures = createTextureStore(starTextureSources);

export const generateStarfieldImage = async ({
    config,
}: {
    config: Partial<StarfieldConfig>;
}) => {
    const offscreen = new OffscreenCanvas(320, 180);

    const ctx = offscreen.getContext("2d");
    if (!ctx) throw new Error("2d404");

    ctx.imageSmoothingEnabled = false;

    const textures = await Promise.all(starTextureSources.map(async src => {
        const response = await fetch(src);
        const blob = await response.blob();
        const imageBitmap = await createImageBitmap(blob);
        const canvas = new OffscreenCanvas(16, 16);
        const ctx = canvas.getContext("2d")!;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(imageBitmap, 0, 0);
        const imageData = ctx.getImageData(0, 0, 16, 16);
        let { r, g, b, a } = toRgba(config.color || "#ffffff");
        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i + 0] *= r / 255;
            imageData.data[i + 1] *= g / 255;
            imageData.data[i + 2] *= b / 255;
            imageData.data[i + 3] *= a;
        }
        ctx.putImageData(imageData, 0, 0);
        return canvas.transferToImageBitmap();
    }));

    let starfield = new StaticStarfield();
    for(let _ of Array(2000).fill(0)) starfield.update(5);
    starfield.render2d(ctx, textures);

    let s = new Star();
    s.position = vec2(50);
    starfield.render2dStar(ctx, textures, s);

    ctx.fillStyle = "red";
    // ctx.fillRect(0, 0, 200, 200);
    ctx.fillText("meow", 20, 10)

    return await offscreen.convertToBlob();
};


