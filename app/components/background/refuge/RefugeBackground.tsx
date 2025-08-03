import { useCallback } from "react";
import { useCanvas, UseCanvasInit } from "../../../hooks/useCanvas";
import { deterministicRandom } from "../../../utils/deterministicRandom";

export const RefugeBackground = () => {
    const init: UseCanvasInit = useCallback((ctx) => {
        ctx.lineWidth = 1;
        ctx.imageSmoothingEnabled = false;

        const drawRect = (
            x: number,
            y: number,
            w: number,
            h: number,
            c: string,
            outline?: string,
        ) => {
            ctx.fillStyle = c;
            ctx.fillRect(x, y, w, h);
            if (outline) {
                ctx.strokeStyle = outline;
                ctx.strokeRect(x + 0.5, y + 0.5, w, h);
            }
        };

        const drawGrid = (
            x: number,
            y: number,
            w: number,
            h: number,
            ax: number,
            ay: number,
            sx: number,
            sy: number,
            c: string,
            o?: string,
        ) => {
            for (let ix = 0; ix < ax; ix++) {
                for (let iy = 0; iy < ay; iy++) {
                    drawRect(
                        x + (w + sx) * ix,
                        y + (h + sy) * iy,
                        w,
                        h,
                        c,
                        o
                    );
                }
            }
        };

        const drawLight = (x: number, y: number, c: string, size: number) => {
            ctx.save();
            ctx.globalAlpha = 0.5;
            let g = ctx.createRadialGradient(x, y, 0, x, y, size);
            g.addColorStop(0, c + "ff");
            g.addColorStop(1, c + "00");
            ctx.beginPath();
            ctx.fillStyle = g;
            ctx.arc(x, y, size, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.restore();
        };

        const drawWindows = () => {

        };

        const building1a = ({
            x, y, fw, h, sw, wh, ww, wax, way, hl,
        }: {
            x: number,
            y: number,
            fw: number,
            h: number,
            sw: number,
            ww: number,
            wh: number,
            wax: number,
            way: number,
            hl: number[],
        }) => {
            const c_front = "#5A0D36";
            const c_front_outline = "#6E1244";
            const c_side = "#290427";
            const c_side_outline = "#4B092E";
            const c_window = "#2A0428";
            const c_window_under = "#B1184B";
            const c_side_window = "#1E021F";
            const c_window_lit = "#FF59BE";

            drawRect(x + fw - 1, y, sw, h, c_side, c_side_outline);
            drawRect(x, y, fw, h, c_front, c_front_outline);

            

            drawGrid(
                x + 4,
                y + 12,
                ww,
                wh,
                wax,
                way,
                5,
                5,
                c_window,
            );
            drawGrid(
                x + 4,
                y + 12 + wh,
                ww,
                1,
                wax,
                way,
                5,
                5 + wh - 1,
                c_window_under,
            );
            drawGrid(
                x + fw + 3,
                y + 12,
                4,
                wh,
                3,
                way,
                3,
                5,
                c_side_window,
            );

            for (let idx of hl) {
                let ox = (idx % wax) * (ww + 5);
                let oy = (Math.floor(idx / way)) * (wh + 5);
                let cx = x + 4 + ox + (ww / 2);
                let cy = y + 12 + oy + (wh / 2);

                drawLight(cx, cy, c_window_lit, 15);
            }

            for (let idx of hl) {
                let ox = (idx % wax) * (ww + 5);
                let oy = (Math.floor(idx / way)) * (wh + 5);

                drawRect(x + 4 + ox, y + 12 + oy, ww, wh, c_window_lit);
            }
        };

        return {
            draw() {
                ctx.lineJoin = "miter";
                ctx.lineCap = "square";
                ctx.strokeStyle = "blue";

                let rand = deterministicRandom();

                let hl = [...new Set(Array(5).fill(0).map(() => (
                    Math.floor(rand() * 25)
                )))];

                building1a({
                    x: 50,
                    y: 50,
                    fw: 70,
                    sw: 25,
                    h: 200,
                    ww: 8,
                    wh: 9,
                    wax: 5,
                    way: 5,
                    hl,
                });
            },
        };
    }, []);

    const { ref } = useCanvas(init);

    return (
        <div className="pageBackground">
            <canvas
                className="pageBackground"
                style={{
                    imageRendering: "crisp-edges",
                }}
                ref={ref}
            />
        </div>
    )
};
