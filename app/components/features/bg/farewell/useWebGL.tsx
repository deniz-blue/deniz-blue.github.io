import { vec2, Vec2 } from "@alan404/vec2";
import { useWindowEvent } from "@mantine/hooks";
import { useEffect, useRef } from "react";

export const useWebGL = ({
    onInitialize,
    onInitializeFail,
    onDestroy,
    onResize,
}: {
    onInitialize?: (gl: WebGL2RenderingContext) => void;
    onInitializeFail?: () => void;
    onDestroy?: () => void;
    onResize?: (dim: Vec2, canvas: HTMLCanvasElement) => void;
} = {}) => {
    let ref = useRef<HTMLCanvasElement | null>(null);
    let gl = useRef<WebGL2RenderingContext | null>(null);

    useEffect(() => {
        if (!ref.current) return;
        ref.current.width = ref.current.clientWidth;
        ref.current.height = ref.current.clientHeight;
        
        const ctx = ref.current.getContext("webgl2", {
            antialias: false,
            powerPreference: "low-power",
            desynchronized: true,
            failIfMajorPerformanceCaveat: true,
        });

        if(!ctx) {
            console.log("WebGL2RenderingContext initialize failed");
            onInitializeFail?.();
            return;
        };

        gl.current = ctx;
        onInitialize?.(ctx);
        ctx.viewport(0, 0, ref.current.width, ref.current.height);
        onResize?.(vec2(ref.current.width, ref.current.height), ref.current);
        
        return () => {
            onDestroy?.();
            gl.current = null;
        };
    }, [ref.current]);

    useWindowEvent("resize", () => {
        if (!ref.current) return;
        ref.current.width = ref.current.clientWidth;
        ref.current.height = ref.current.clientHeight;
        gl.current?.viewport(0, 0, ref.current.width, ref.current.height);
        onResize?.(vec2(ref.current.width, ref.current.height), ref.current);
    });

    return { ref, gl };
};
