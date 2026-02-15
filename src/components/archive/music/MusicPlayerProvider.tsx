import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { MusicPlayerContext, Song } from "./MusicPlayerContext";
import { MUSIC_DATA } from "./data";
import { notifications } from "@mantine/notifications";
import { Localized } from "@alan404/react-localization";

export const MusicPlayerProvider = ({
    children,
}: PropsWithChildren) => {
    const ref = useRef<HTMLAudioElement | null>(null);
    const audioContext = useRef<AudioContext | null>(null);
    const analyser = useRef<AnalyserNode | null>(null);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [loading, setLoading] = useState(false);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        let audio = new Audio();
        ref.current = audio;
        // audio.loop = true // TODO;
        return () => {
            audioContext.current?.close();
            audio.pause();
            audio.remove();
            ref.current = null;
        };
    }, []);

    useEffect(() => {
        if(!ref.current) return;

        const abort = new AbortController();
        const { signal } = abort;

        ref.current.addEventListener("playing", () => {
            notifications.hide("music-error");
        }, { signal });

        return () => abort.abort();
    }, [])

    useEffect(() => {
        if(!ref.current) return;

        const abort = new AbortController();
        const { signal } = abort;

        ref.current.addEventListener("ended", () => {
            if(!currentSong) return;
            const playlist = MUSIC_DATA;
            let currentIndex = playlist.indexOf(currentSong);
            if(currentIndex == -1) return;
            let nextIndex = currentIndex + 1;
            if(nextIndex >= playlist.length) nextIndex = 0;
            let nextTrack = playlist[nextIndex];
            if(!nextTrack) return;
            setCurrentSong(nextTrack);
        }, { signal });

        return () => abort.abort();
    }, [currentSong])

    useEffect(() => {
        if (currentSong) {
            notifications.show({
                id: "music-nowplaying",
                title: (
                    <Localized
                        en="Now Playing"
                        tr="Şimdi Çalıyor"
                    />
                ),
                message: currentSong.title,
            });

            return () => void notifications.hide("music-nowplaying");
        } else {
            notifications.hide("music-nowplaying");
        }
    }, [currentSong]);

    const play = () => {
        ref.current?.play()
            .then(() => {
                audioContext.current = new AudioContext();
                let source = audioContext.current.createMediaElementSource(ref.current!);
                analyser.current = audioContext.current.createAnalyser();
                source.connect(analyser.current);
                source.connect(audioContext.current.destination);
            })
            .catch(e => {
                if(e instanceof DOMException && e.name == "NotAllowedError") {
                    notifications.show({
                        id: "music-error",
                        message: (
                            <Localized
                                en="Can't play music, please click anywhere"
                                tr="Müzik çalınamıyor, herhangi bir yere tıklayın"
                            />
                        ),
                        autoClose: false,
                        position: "top-center",
                        color: "yellow",
                    });

                    const onClick = () => play();
                    window.addEventListener("click", onClick, { once: true });
                }
            })
    };

    useEffect(() => {
        if(!ref.current) return;
        
        ref.current.pause();
        ref.current.src = currentSong ? `/assets/music/${currentSong.file}` : "";
        if(currentSong) play();
    }, [currentSong]);

    // useEffect(() => void setCurrentSong(MUSIC_DATA[1]), []);

    return (
        <MusicPlayerContext.Provider
            value={{
                ref,
                loading,
                playing,
                currentSong,
                analyser,
                audioContext,
                changeCurrentSong: setCurrentSong,
            }}
        >
            {children}
        </MusicPlayerContext.Provider>
    );
};
