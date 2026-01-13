import { useContext, useEffect, useRef } from "react";
import { MusicPlayerContext } from "../MusicPlayerContext";
import { useUpdateInterval } from "../../bg/farewell/useUpdateInterval";

export const useAudioFFT = () => {
    const { analyser } = useContext(MusicPlayerContext);
    const fft = useRef<Uint8Array>(new Uint8Array(analyser.current?.frequencyBinCount || 0));

    useUpdateInterval({
        update: () => {
            if(!analyser.current) return;
            if(fft.current.length !== analyser.current.frequencyBinCount)
                fft.current = new Uint8Array(analyser.current.frequencyBinCount);
            analyser.current.getByteFrequencyData(fft.current);
        },
    });

    return fft;
};
