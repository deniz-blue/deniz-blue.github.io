import { useEffect, useMemo, useRef, useState } from "react";
import { useCountdown } from "./useCountdown";

export const useBeatdrop = ({
    audioSrc,
    beatDropOn,
    beatDropPosition,
    maxDelay = 1,
}: {
    beatDropOn: Date;
    beatDropPosition: number;
    audioSrc: string;
    maxDelay?: number;
}) => {
    const DEFAULT_VOLUME = 0.5;
    const ref = useRef<HTMLAudioElement | null>(null);
    const [volume, _setVolume] = useState(DEFAULT_VOLUME);
    const [err, setErr] = useState<any>(null);

    useEffect(() => {
        let audio = new Audio(audioSrc);
        ref.current = audio;
        audio.volume = DEFAULT_VOLUME;
        _setVolume(audio.volume);

        return () => {
            audio.pause();
        };
    }, [audioSrc]);

    const startPlaybackOn = useMemo(() => (
        beatDropOn.getTime() - (beatDropPosition * 1000) - 1000
    ), [
        beatDropOn,
        beatDropPosition,
    ]);

    const {
        countdownReached,
        timerText,
    } = useCountdown({
        countdownTime: beatDropOn,
        update: () => {
            const date = new Date();

            if(!ref.current) return;
            if(!ref.current.paused) setErr(null);
    
            const endPlaybackOn = startPlaybackOn + ((ref.current.duration + 2)*1000);
    
            if(
                ref.current.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
                && startPlaybackOn < date.getTime()
                && endPlaybackOn > date.getTime()
            ) {
                let approxTime = (date.getTime() - startPlaybackOn) / 1000;
    
                try {
                    if (ref.current.paused) {
                        ref.current.play()
                            .catch(e => {
                                console.log("play() error", e);
                                setErr(e);
                            });
                        ref.current.currentTime = approxTime;
                    };
    
                    let { currentTime } = ref.current;
                    if(Math.abs(currentTime - approxTime) >= maxDelay) {
                        ref.current.currentTime = approxTime;
                    }
                } catch(e: any) {
                    console.log("setter currentTime error", e);
                    setErr(e);
                }
            }
        },
    });

    const isPlaying = ref.current && !ref.current?.paused;

    return {
        startPlaybackOn,
        isPlaying,
        countdownReached,
        timerText,
        volume,
        setVolume: (v: number) => {
            if(ref.current) ref.current.volume = v;
            _setVolume(v);
        },
        err,
    };
};
