export const setRafInterval = (cb: (dt: number) => any, delay: number) => {
    let start = performance.now();
    const loop = () => {
        const current = performance.now();
        if (current - start >= delay) {
            let deltaTime = (current - start) / 1000;
            if(deltaTime > 1) deltaTime %= 1;
            cb(deltaTime);
            start = performance.now();
        }
        handle = requestAnimationFrame(loop);
    };
    let handle = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(handle);
};
