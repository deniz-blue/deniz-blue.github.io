import { useCallback, useEffect, useRef } from "react";
import { useSetInterval } from "./useSetInterval";
import { useWindowEvent } from "@mantine/hooks";

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
        handleResize?: boolean;
    } = {},
) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const store = useRef<UseCanvasReturn>(null);

    useEffect(() => {
        const canvas = ref.current;
        if(!canvas) return;

        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        const ctx = canvas.getContext("2d", {
            alpha: true,
            desynchronized: true,
        });

        if(!ctx) return opts?.onFail?.();

        store.current = init(ctx);

        return () => {
            store.current?.destroy?.();
        };
    }, [ref]);

    const update = useCallback(() => {
        store.current?.draw();
    }, []);

    const draw = useCallback(() => {
        store.current?.update?.(1);
    }, []);
    
    useSetInterval(update, 24);
    useSetInterval(draw, 24);

    const updateViewport = useCallback(() => {
        if(!ref.current || opts.handleResize===false) return;
        ref.current.width = ref.current.clientWidth;
        ref.current.height = ref.current.clientHeight;
    }, [ref, opts.handleResize]);

    useWindowEvent("resize", updateViewport);

    return {
        ref,
    };
};
