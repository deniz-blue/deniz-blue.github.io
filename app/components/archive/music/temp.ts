import { useEffect, useRef } from "react";
import { useAudioFFT } from "./hooks/useAudioFFT";
import { useUpdateInterval } from "../bg/farewell/useUpdateInterval";

export const useAmplitude = () => {
    let value = useRef(0);

    const fft = useAudioFFT();

    useUpdateInterval({
        update(dt, elapsed) {
            let maxAmp = Math.max(...fft.current);
            let avg = fft.current.reduce((a,b)=>a+b,0) / fft.current.length;
            // maxAmp = maxAmp > 1 ? maxAmp : 0;
            value.current = maxAmp / 256;
            return
            value.current = damp(
                value.current,
                maxAmp,
                // 255 - Math.max(0, maxAmpF - 0.4) * 0.04,
                0.9, elapsed
            ) / 8;
        },
    });

    return value;
};


export const magicFunction = (arr: Uint8Array, dt: number) => {
    let avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    
    let oldscale = 0;

    return damp(
        oldscale,
        255 - Math.max(0, Math.max(...arr)) * 0.04,
        0.9, dt
    )

    return avg;
};

export const damp = (start: number, final: number, base: number, exponent: number) => {
    return lerp(start, final, 1 - Math.pow(base, exponent));
};

export const lerp = (start: number, final: number, amount: number) => {
    return start + (final - start) * amount;
};
