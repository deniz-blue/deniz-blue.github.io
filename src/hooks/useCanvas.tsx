import { useCallback, useEffect, useRef } from "react";
import { useWindowEvent } from "@mantine/hooks";
import { vec2, Vec2 } from "@alan404/vec2";
import { useRafInterval } from "./useRafInterval";

export type UseCanvasReturn = {
    update?: (dt: number) => void;
    draw: () => void;
    destroy?: () => void;
};

export type UseCanvasInit = (ctx: CanvasRenderingContext2D) => UseCanvasReturn;

export const useCanvas = (
    init: UseCanvasInit,
    opts: {
        onFail?: () => any;
        size?: ((cv: HTMLCanvasElement) => Vec2) | Vec2 | null;
        noClear?: boolean;
        delay?: number;
    } = {},
) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D>(null);
    const store = useRef<UseCanvasReturn>(null);

    const resizeCanvas = (canvas: HTMLCanvasElement) => {
        let { x, y } = typeof opts.size == "function" ? opts.size(canvas) : vec2(
            (opts.size?.x && opts.size?.x > 0) ? opts.size?.x : canvas.clientWidth,
            (opts.size?.y && opts.size?.y > 0) ? opts.size?.y : canvas.clientHeight
        );

        canvas.width = x;
        canvas.height = y;
    };

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;

        resizeCanvas(canvas);

        const ctx = canvas.getContext("2d", {
            alpha: true,
            desynchronized: true,
        });

        if (!ctx) return opts?.onFail?.();
        ctxRef.current = ctx;

        store.current = init(ctx);

        return () => {
            store.current?.destroy?.();
            ctxRef.current = null;
        };
    }, [init, ref]);

    const tick = useCallback(() => {
        store.current?.update?.(1);

        if (ctxRef.current) {
            ctxRef.current.clearRect(0, 0, ctxRef.current.canvas.width, ctxRef.current.canvas.height);
        }

        store.current?.draw();
    }, [opts.noClear]);

    useRafInterval(tick, opts.delay || 30);

    const updateViewport = useCallback(() => {
        if (!ref.current) return;
        resizeCanvas(ref.current);
    }, [ref, opts.size]);

    useWindowEvent("resize", updateViewport);

    return {
        ref,
    };
};
