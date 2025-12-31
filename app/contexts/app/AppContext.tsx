import { create } from "zustand";

export const defaultAppFlags = {
    showTerminal: false,
    showDevice: false,
    showPamphlet: false,
    showPamphletV2: true,
    showCountdown: false,
    showWD: false,
    rain: false,
    sunShattered: false,
};

export type AppFlags = typeof defaultAppFlags;

export const useAppFlagsStore = create<AppFlags>()(() => defaultAppFlags);
