import { useCallback, useEffect, useRef } from "react";
import { useWebAudioContext } from "./WebAudioContext";
import { useWebAudioBuffer } from "./useWebAudioBuffer";

export const useSoundEffect = (
    src: string,
) => {
    const audioContextRef = useWebAudioContext();
    const audioBufferRef = useWebAudioBuffer(src);

    const play = useCallback(() => {
        if (!audioContextRef.current || !audioBufferRef.current) return;

        if(audioContextRef.current.state == "suspended")
            audioContextRef.current.resume();

        const compressor = audioContextRef.current.createDynamicsCompressor();
        compressor.connect(audioContextRef.current.destination);

        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.connect(compressor);
        source.start(0);
    }, [audioContextRef]);

    return {
        play,
    };
};
