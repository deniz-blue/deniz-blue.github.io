import { useEffect } from "react";

export const useUpdateInterval = ({
    update,
    fps = 30,
}: {
    update: (dt: number, elapsed: number) => void;
    fps?: number;
}) => {
    useEffect(() => {
        let last = performance.now();
        const i = setInterval(() => {
            let now = performance.now();
            update((now - last) / fps, now - last);
            last = now;
        }, 1000/fps);
        return () => clearInterval(i);
    }, [update, fps]);
};
