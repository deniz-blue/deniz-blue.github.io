import { useEffect, useState } from "react";
import { useMusicPlayer } from "../MusicPlayerContext";

export const useAudioState = <T,>(
    defaultValue: T,
    get: (audio: HTMLAudioElement) => T,
    events: (keyof HTMLMediaElementEventMap)[],
) => {
    const { ref } = useMusicPlayer();

    const [value, setValue] = useState(ref.current ? get(ref.current) : defaultValue);

    useEffect(() => {
        if (!ref.current) return;

        const abort = new AbortController();
        const { signal } = abort;

        const update = () => {
            if (!ref.current) return;
            setValue(get(ref.current));
        };

        for(let ev of events)
            ref.current.addEventListener(ev, update, { signal });

        update();

        return () => abort.abort();
    }, [ref]);

    return value;
};
