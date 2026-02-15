import { useWindowEvent } from "@mantine/hooks";
import { useCallback, useRef } from "react";

export const useAudioUnlocker = () => {
    const ref = useRef<HTMLAudioElement>(null);

    const unlockAudio = useCallback(() => {
        ref.current?.play().catch(() => {});
    }, [ref]);

    useWindowEvent("click", unlockAudio, { once: true });

    return ref;
};
