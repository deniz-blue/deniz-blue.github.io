import { useEffect, useRef } from "react";
import { useWebAudioContext } from "./WebAudioContext";

export const useWebAudioBuffer = (src: string) => {
    const audioContextRef = useWebAudioContext();
    const ref = useRef<AudioBuffer | null>(null);

    useEffect(() => {
        if(!audioContextRef.current) return;

        fetch(src)
            .then(res => res.arrayBuffer())
            .then(data => audioContextRef.current!.decodeAudioData(data))
            .then(buffer => {
                ref.current = buffer;
                console.log("Loaded", src);
            })
            .catch(console.error);
    }, [audioContextRef.current, src]);

    return ref;
};
