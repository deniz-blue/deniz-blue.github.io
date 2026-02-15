import { Vec2, vec2, vec2div, vec2floor, vec2sub } from "@alan404/vec2";
import { useWindowEvent } from "@mantine/hooks";
import { useEffect, useState } from "react";

export const useTerminalSize = () => {
    const calc = () => {
        if (typeof window === "undefined") return vec2();
        return vec2floor((
            vec2div(
                vec2sub(vec2(window.innerWidth, window.innerHeight), 8),
                vec2(10.7, 16)
            )
        ));
    };

    const [size, setSize] = useState<Vec2>(vec2());
    useEffect(() => setSize(calc()), []);
    useWindowEvent("resize", () => setSize(calc()));

    return size;
};
