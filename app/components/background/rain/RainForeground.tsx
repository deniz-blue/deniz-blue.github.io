import { useCallback } from "react";
import { useCanvas, UseCanvasInit } from "../../../hooks/useCanvas";
import { Vec2, vec2 } from "@alan404/vec2";
import { randArr, randInt } from "../../../utils/math";
import THE_PLACE_WHERE_IT_RAINED from "./rain.ogg";
import { useAudioUnlocker } from "../../../hooks/useAudioUnlocker";

interface Droplet {
    x: number;
    y: number;
    vy: number;
    color: string;
    sinkSpeed: number;
    size: number;
    splash: number;
    alpha: number;
}

const DropletColors = [
    "#0000FF",
    "#0055EE",
    "#0a205a",
    "#0515a6",
];

export const RainForeground = () => {
    const init: UseCanvasInit = useCallback((ctx) => {
        let droplets: Set<Droplet> = new Set();
        let wind = vec2();
        let percentage = 0.4;

        const splashSpeed = 0.002;

        const debug = false;

        return {
            update(dt) {
                for (let droplet of droplets) {
                    if ((droplet.y + droplet.size * 3) >= ctx.canvas.height) {
                        droplet.y = ctx.canvas.height;
                        if (droplet.splash > 1) {
                            droplets.delete(droplet);
                        } else {
                            droplet.splash += (splashSpeed * droplet.vy * dt);
                        }
                    } else {
                        droplet.vy += droplet.sinkSpeed * 0.03 * dt;
                        droplet.x += (wind.x * dt);
                        droplet.y += (droplet.vy * dt) + (wind.y * dt);
                    }
                }

                let amt = Math.floor(percentage * ctx.canvas.width);
                if (debug) amt = 1;
                while (droplets.size < amt) {
                    droplets.add({
                        x: randInt(ctx.canvas.width),
                        y: -randInt(ctx.canvas.height * 2),
                        vy: 0 + Math.random(),
                        color: randArr(DropletColors),
                        sinkSpeed: randInt(15) + 15,
                        size: randInt(2) + 3,
                        splash: 0,
                        alpha: Math.random()+0.1,
                    });
                }
            },

            draw() {
                for (let droplet of droplets) {
                    ctx.fillStyle = droplet.color;
                    ctx.globalAlpha = droplet.alpha;

                    if (droplet.splash) {
                        const splashLength = droplet.size * 2;
                        const splashHeight = droplet.size * 2;

                        const a = -1;
                        const parabola = (T: Vec2) => (_x: number) => a * Math.pow(_x - T.x, 2) + T.y;

                        const f = parabola(vec2(1,1));
                        const height = f(droplet.splash * 2) * splashHeight;

                        const size = (droplet.size / 2) * (1.5-droplet.splash);
                        const yOffset = droplet.size / 2;
                        ctx.fillRect(
                            droplet.x + droplet.splash * splashLength,
                            droplet.y - height - yOffset,
                            size,
                            size
                        );
                        ctx.fillRect(
                            droplet.x - droplet.splash * splashLength,
                            droplet.y - height - yOffset,
                            size,
                            size
                        );
                    } else {
                        ctx.fillRect(droplet.x, droplet.y, droplet.size / 2, (droplet.size * 2 + droplet.vy*0.1));
                    }
                }
            },
        };
    }, []);

    const { ref } = useCanvas(init, {});

    const audioRef = useAudioUnlocker();

    return (
        <div className="fullscreen">
            <canvas
                className="fullscreen"
                ref={ref}
            />

            <audio
                src={THE_PLACE_WHERE_IT_RAINED}
                ref={audioRef}
                loop
                autoPlay
            />
        </div>
    )
};
