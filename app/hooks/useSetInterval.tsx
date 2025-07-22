import { useEffect } from "react";

export const useSetInterval = (fn: Function, delay: number) => {
    useEffect(() => {
        const i = setInterval(fn, delay);
        return () => clearInterval(i);
    }, [fn, delay]);
};
