import { useCallback } from "react";
import { useCanvas, UseCanvasInit } from "../../../hooks/useCanvas";
import { deterministicRandom } from "../../../utils/deterministicRandom";
import { Vec2, vec2, vec2add, vec2div, vec2mul } from "@alan404/vec2";

export const RefugeBackground = () => {
    const init: UseCanvasInit = useCallback((ctx) => {
        ctx.lineWidth = 1;
        ctx.imageSmoothingEnabled = false;

        const c_front = "#5A0D36";
        const c_front_outline = "#6E1244";
        const c_side = "#290427";
        const c_side_outline = "#4B092E";
        const c_window = "#2A0428";
        const c_window_under = "#B1184B";
        const c_side_window = "#1E021F";
        const c_window_lit = "#FF59BE";

        const drawRect = (
            pos: Vec2,
            size: Vec2,
            c: string,
            outline?: string,
        ) => {
            ctx.fillStyle = c;
            ctx.fillRect(pos.x, pos.y, size.x, size.y);
            if (outline) {
                ctx.strokeStyle = outline;
                ctx.strokeRect(pos.x + 0.5, pos.y + 0.5, size.x, size.y);
            }
        };

        const drawGrid = (
            pos: Vec2,
            size: Vec2,
            amount: Vec2,
            spacing: Vec2,
            c: string,
            o?: string,
        ) => {
            for (let ix = 0; ix < amount.x; ix++) {
                for (let iy = 0; iy < amount.y; iy++) {
                    drawRect(
                        vec2add(pos, vec2mul(vec2add(size, spacing), vec2(ix, iy))),
                        size,
                        c,
                        o
                    );
                }
            }
        };

        const drawLight = (pos: Vec2, c: string, size: number) => {
            ctx.save();
            ctx.globalAlpha = 0.5;
            let g = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, size);
            g.addColorStop(0, c + "ff");
            g.addColorStop(1, c + "00");
            ctx.beginPath();
            ctx.fillStyle = g;
            ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.restore();
        };

        const buildingBase = ({
            pos,
            padding,
            windowSize,
            windowSpacing,
            windowAmount,

            color,
            outlineColor,
            windowColor,
            windowUnderlineColor,
            windowLitIndicies,
            windowLitColor,
            windowLitSize,
        }: {
            pos: Vec2;
            padding: Vec2;
            windowSize: Vec2;
            windowSpacing: Vec2;
            windowAmount: Vec2;

            color: string;
            outlineColor?: string;
            windowColor: string;
            windowUnderlineColor?: string;
            windowLitColor?: string;
            windowLitSize?: number;
            windowLitIndicies?: number[];
        }) => {
            const buildingSize = vec2(
                padding.x + windowSize.x * windowAmount.x + windowSpacing.x * (windowAmount.x - 1) + padding.x,
                ctx.canvas.height - pos.y - 1,
            );

            drawRect(pos, buildingSize, color, outlineColor);
            drawGrid(
                vec2add(pos, padding),
                windowSize,
                windowAmount,
                windowSpacing,
                windowColor,
            );

            if (windowUnderlineColor) {
                drawGrid(
                    vec2add(pos, padding, vec2(0, windowSize.y)),
                    vec2(windowSize.x, 1),
                    windowAmount,
                    vec2(windowSpacing.x, windowSpacing.y + windowSize.y - 1),
                    windowUnderlineColor,
                );
            }

            if (windowLitColor && windowLitIndicies?.length && windowLitSize) {
                for (let idx of windowLitIndicies) {
                    // let ox = (idx % wax) * (ww + 5);
                    // let oy = (Math.floor(idx / way)) * (wh + 5);
                    // let cx = x + 4 + ox + (ww / 2);
                    // let cy = y + 12 + oy + (wh / 2);
                    let offset = vec2mul(
                        vec2(idx % windowAmount.x, Math.floor(idx / windowAmount.y)),
                        vec2add(windowSize, windowSpacing),
                    );

                    let center = vec2add(
                        pos,
                        padding,
                        offset,
                        vec2div(windowSize, 2),
                    );

                    drawLight(center, c_window_lit, 15);
                    drawRect(vec2add(pos, padding, offset), windowSize, windowLitColor);
                }
            }

            return {
                buildingSize,
            };
        };

        const building1 = ({
            x, y, hl, frontWindowAmount, sideWindowAmount,
        }: {
            x: number,
            y: number,
            hl: number[],
            frontWindowAmount: number,
            sideWindowAmount: number,

        }) => {
            const wh = 9;
            const wsy = 5;
            const way = Math.floor(ctx.canvas.height / (wh + wsy)) - 5;

            const { buildingSize: frontSize } = buildingBase({
                pos: vec2(x, y),
                padding: vec2(4, 12),

                color: c_front,
                outlineColor: c_front_outline,

                windowColor: c_window,
                windowSize: vec2(8, wh),
                windowSpacing: vec2(5, wsy),
                windowAmount: vec2(frontWindowAmount, way),
                windowUnderlineColor: c_window_under,
                windowLitColor: c_window_lit,
                windowLitSize: 15,
                windowLitIndicies: hl,
            });

            buildingBase({
                pos: vec2(frontSize.x + x + 1, y),
                padding: vec2(4, 12),

                color: c_side,
                outlineColor: c_side_outline,

                windowColor: c_side_window,
                windowSize: vec2(4, wh),
                windowSpacing: vec2(3, wsy),
                windowAmount: vec2(sideWindowAmount, way),
                // windowLitColor: c_window_lit,
                // windowLitSize: 15,
                // windowLitIndicies: hl,
            });

            return {
                frontSize,
            };
        };

        return {
            draw() {
                ctx.lineJoin = "miter";
                ctx.lineCap = "square";
                ctx.strokeStyle = "blue";

                // drawRect(0,0,640,479,"blue", "red")

                let rand = deterministicRandom();

                let x = 4;
                for (let bi of Array(20).fill(0)) {
                    let hl = [...new Set(Array(5).fill(0).map(() => (
                        Math.floor(rand() * 1000)
                    )))];

                    let { frontSize } = building1({
                        x: x,
                        y: ctx.canvas.height - Math.floor(ctx.canvas.height * rand() * 0.7),
                        frontWindowAmount: 5,
                        sideWindowAmount: 3,
                        hl,
                    });

                    x += frontSize.x;
                    x += rand() > 0.9 ? 50 : 0;
                    x += 4;
                }
            },
        };
    }, []);

    const { ref } = useCanvas(init, {
        delay: 500,
        size: (canvas) => {
            const h = 480;
            const w = (h / canvas.clientHeight) * canvas.clientWidth;
            return vec2(
                w,
                h,
            );
        },
    });

    return (
        <div className="pageBackground">
            <canvas
                className="pageBackground"
                style={{
                    imageRendering: "crisp-edges",
                    backgroundImage: "linear-gradient(#18031A, #23051F, #3B0929)",
                }}
                ref={ref}
            />
        </div>
    )
};
