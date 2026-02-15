import { useEffect, useRef, useState, memo } from "react";
import { EnderWorkerInput } from "./ender.msg";
import { useWindowEvent } from "@mantine/hooks";
import { vec2 } from "@alan404/vec2";

export const EnderBackground = memo(() => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div
            className="pageBackground"
            style={{
                backgroundColor: "black",
            }}
        >
            {mounted && <EnderCanvas />}
        </div>
    );
});


export const EnderCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        let abortController = new AbortController();
        let signal = abortController.signal;
        const id = requestAnimationFrame(() => {
            if (signal.aborted) return;

            const canvas = canvasRef.current;
            if (!canvas) return;

            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            const offscreen = canvas.transferControlToOffscreen();

            const worker = new Worker(new URL("./ender.worker.ts", import.meta.url), {
                type: "module",
            });

            worker.postMessage({ type: "init", data: offscreen }, [offscreen]);
            workerRef.current = worker;
        });

        return () => {
            cancelAnimationFrame(id);
            workerRef.current?.terminate();
            abortController.abort();
            workerRef.current = null;
        };
    }, []);

    useWindowEvent("resize", () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        workerRef.current?.postMessage({
            type: "dimensionsChange",
            data: vec2(canvas.clientWidth, canvas.clientHeight),
        });
    });

    return (
        <canvas
            ref={canvasRef}
            className="fullscreenDynamic"
            style={{
                imageRendering: "pixelated",
            }}
        />
    );
};



