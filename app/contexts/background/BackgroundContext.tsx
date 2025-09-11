import { useHotkeys } from "@mantine/hooks";
import { createContext, PropsWithChildren, useContext, useState } from "react";

export type Background = {
    type: "null" | "depth" | "man" | "starfield" | "oneshot" | "refuge";
};

export const DefaultBackground: Background = {
    type: "oneshot",
};

export const BackgroundContext = createContext<[Background, (b: Background) => void]>([DefaultBackground, ()=>{}]);

export const BackgroundContextProvider = ({ children }: PropsWithChildren) => {
    const [bg, set] = useState(DefaultBackground);

    useHotkeys([
        ["1", () => set({ type: "starfield" })],
        ["2", () => set({ type: "depth" })],
        ["3", () => set({ type: "man" })],
        ["0", () => set({ type: "null" })],
        ["4", () => set({ type: "oneshot" })],
    ]);

    return (
        <BackgroundContext.Provider
            value={[bg, set]}
        >
            {children}
        </BackgroundContext.Provider>
    );
};

export const useBackgroundContext = () => useContext(BackgroundContext);
