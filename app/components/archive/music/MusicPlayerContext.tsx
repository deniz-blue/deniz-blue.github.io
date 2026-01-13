import { createContext, Ref, RefObject, useContext } from "react";

export type Song = {
    title: string;
    romanji?: string;
    originalTitle?: string;
    artist: string;
    cover: string;
    file: string;
    complete?: boolean;
};

export interface IMusicPlayer {
    ref: RefObject<HTMLAudioElement | null>;
    audioContext: RefObject<AudioContext | null>;
    analyser: RefObject<AnalyserNode | null>;
    currentSong: Song | null;
    changeCurrentSong: (s: Song | null) => void;
    playing: boolean;
    loading: boolean;
};

export const MusicPlayerContext = createContext<IMusicPlayer>({
    ref: { current: null },
    analyser: { current: null },
    audioContext: { current: null },
    currentSong: null,
    loading: true,
    playing: false,
    changeCurrentSong: () => {},
});

export const useMusicPlayer = () => useContext(MusicPlayerContext);
