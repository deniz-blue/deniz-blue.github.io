import { createContext, PropsWithChildren, useContext, useState } from "react";

export type Background = {
    type: "null" | "depth" | "man" | "starfield" | "oneshot";
};

export const DefaultBackground: Background = {
    type: "depth",
};

export const BackgroundContext = createContext<[Background, (b: Background) => void]>([DefaultBackground, ()=>{}]);

export const BackgroundContextProvider = ({ children }: PropsWithChildren) => {
    const [bg, set] = useState(DefaultBackground);

    return (
        <BackgroundContext.Provider
            value={[bg, set]}
        >
            {children}
        </BackgroundContext.Provider>
    );
};

export const useBackgroundContext = () => useContext(BackgroundContext);
