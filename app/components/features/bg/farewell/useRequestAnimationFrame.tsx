import { useEffect } from "react";
import { useUpdateInterval } from "./useUpdateInterval";

export const useRequestAnimationFrame = ({
    render,
    deltaTimeFPS = 30,
}: {
    render: (dt: number) => void;
    deltaTimeFPS?: number;
}) => {

    useUpdateInterval({
        fps: deltaTimeFPS,
        update: (dt, elapsed) => {
            render(dt);
        },
    });

    return;

    useEffect(() => {
        let frame = 0;
        let lastDraw = performance.now();

        const perfectFrameTime = 1000 / deltaTimeFPS;
        const renderer: FrameRequestCallback = (timestamp) => {
            let deltaTime = (timestamp - lastDraw) / perfectFrameTime;
            lastDraw = timestamp;
            
            let dt = Math.min(deltaTime, deltaTimeFPS);
            render(dt);
            frame = requestAnimationFrame(renderer)
        }

        frame = requestAnimationFrame(renderer);

        return () => {
            cancelAnimationFrame(frame);
        };
    }, [render]);
};

