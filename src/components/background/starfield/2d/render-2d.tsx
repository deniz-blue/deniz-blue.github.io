import { vec2, Vec2, vec2add, vec2sub } from "@alan404/vec2";
import { StaticStarfield } from "../starfield";

export const starfield_render2d = (
    starfield: StaticStarfield,
    ctx: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D,
    textures: CanvasImageSource[]
) => {
    for (let star of starfield.stars) {
        let vec = StaticStarfield.ScreenPosOfStar(star);

        vec = vec2sub(vec, 16);

        ctx.fillStyle = "green";
        ctx.fillRect(310, 170, 10, 10);
        ctx.drawImage(textures[star.texture], vec.x, vec.y, 16, 16);
    }
};

