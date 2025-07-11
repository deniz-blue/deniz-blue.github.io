import { useRef } from "react";
import { useWebGL } from "./useWebGL";
import { Effect } from "./types";
import { vec2, Vec2, vec2eq } from "@alan404/vec2";
import { useRequestAnimationFrame } from "./useRequestAnimationFrame";
import { useUpdateInterval } from "./useUpdateInterval";
import { useWindowEvent } from "@mantine/hooks";

type EffectConstructor = new (gl: WebGL2RenderingContext) => Effect;

export const useEffects = ({
    effects,
    onDimensionsChange,
    onInitialized,
}: {
    effects: [EffectConstructor][];
    onDimensionsChange?: (dims: Vec2) => void;
    onInitialized?: () => void;
}) => {
    const store = useRef<Effect[]>([]);

    const updateDimensions = (dim: Vec2) => {
        for (let effect of store.current) {
            if (!vec2eq(dim, effect.dimensions)) {
                effect.onDimensionsChange(dim);
            }
        }

        onDimensionsChange?.(dim);
    };

    const { ref, gl } = useWebGL({
        onInitialize: (gl) => {
            store.current = effects.map(([ctor]) => (
                new ctor(gl)
            ));

            updateDimensions({
                x: gl.canvas.width,
                y: gl.canvas.height,
            });

            onInitialized?.();
        },
        onDestroy: () => {
            store.current = [];
        },
        onResize: (dim) => {
            updateDimensions(dim);
        },
    });

    useRequestAnimationFrame({
        render: () => {
            gl.current?.clearColor(0, 0, 0, 0);
            gl.current?.clear(gl.current.COLOR_BUFFER_BIT);

            for (let effect of store.current) {
                effect.render();
            }
        },
    });

    useUpdateInterval({
        fps: 30,
        update: (dt) => {
            for (let effect of store.current)
                effect.update(1 * dt);
        },
    });

    useWindowEvent("mousemove", (e) => {
        for (let effect of store.current)
            effect.onMouseMove(vec2(e.clientX, e.clientY));
    });

    return {
        ref,
        gl,
        store,
    };
};
