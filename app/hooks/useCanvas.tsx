import { useCallback, useEffect, useRef } from "react";
import { useSetInterval } from "./useSetInterval";
import { useWindowEvent } from "@mantine/hooks";
import { Vec2 } from "@alan404/vec2";
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
        size?: Vec2 | null;
        noClear?: boolean;
    } = {},
) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D>(null);
    const store = useRef<UseCanvasReturn>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;

        canvas.width = opts.size?.x || canvas.clientWidth;
        canvas.height = opts.size?.y || canvas.clientHeight;

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

    useRafInterval(tick, 30);

    const updateViewport = useCallback(() => {
        if (!ref.current) return;
        ref.current.width = opts.size?.x || ref.current.clientWidth;
        ref.current.height = opts.size?.y || ref.current.clientHeight;
    }, [ref, opts.size]);

    useWindowEvent("resize", updateViewport);

    return {
        ref,
    };
};
