import React, { createContext, PropsWithChildren, RefObject, useContext, useEffect, useRef } from "react";

const WebAudioContext = createContext<RefObject<AudioContext | null>>({ current: null });

export const WebAudioContextProvider = ({ children }: PropsWithChildren) => {
    const ref = useRef<AudioContext>(null);

    useEffect(() => {
        ref.current = new AudioContext();
        return () => void ref.current?.close();
    }, []);

    return (
        <WebAudioContext.Provider value={ref}>
            {children}
        </WebAudioContext.Provider>
    );
};

export const useWebAudioContext = () => useContext(WebAudioContext);
