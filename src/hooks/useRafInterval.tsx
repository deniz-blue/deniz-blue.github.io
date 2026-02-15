import { useEffect, useRef } from "react";

export const useRafInterval = (
    callback: Function,
    delay: number,
) => {
    const ref = useRef(callback);
    ref.current = callback;

    useEffect(() => {
        let start = performance.now();
        const loop = () => {
            const current = performance.now();
            if (current - start >= delay) {
                ref.current();
                start = performance.now();
            }
            handle = requestAnimationFrame(loop);
        };
        let handle = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(handle);
        };
    }, []);
};
