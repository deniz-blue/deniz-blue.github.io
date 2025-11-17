import { create } from "zustand";
import { useAppContext } from "../../contexts/app/AppContext";
import { DepthBackground } from "./depth/DepthBackground";
import { ManBackground } from "./man/ManBackground";
import { OneShotBackground } from "./oneshot/OneshotBackground";
import { RainForeground } from "./rain/RainForeground";
import { RefugeBackground } from "./refuge/RefugeBackground";
import { StarfieldBackground } from "./starfield/StarfieldBackground";
import { Enum } from "@alan404/enum";
import { WinterBackground } from "./winter/WinterBackground";
import { MariaCarey } from "./winter/MariaCarey";

export type Background = Enum<{
    null: {};
    depth: {};
    man: {};
    starfield: {};
    oneshot: {
        dead: boolean;
    };
    refuge: {};
    winter: {};
    ender: {};
}>;

export const useBackgroundStore = create<{
    background: Background;
    setBackground: (bg: Background) => void;
}>()((set, get) => ({
    background: { type: "winter", data: {} },
    setBackground: (background) => set(state => ({ background })),
}))

export const PageBackground = () => {
    const background = useBackgroundStore(store => store.background);
    const [{ rain }] = useAppContext();

    return (
        <div style={{
            position: "absolute",
            zIndex: -1,
            pointerEvents: "none",
            width: "100%",
            height: "100%",
            inset: 0,
            minHeight: "100svh",
        }}>
            {rain && <RainForeground />}

            {background.type === "starfield" && <StarfieldBackground />}
            {background.type === "oneshot" && <OneShotBackground />}
            {background.type === "depth" && <DepthBackground />}
            {background.type === "man" && <ManBackground />}
            {background.type === "refuge" && <RefugeBackground />}
            {background.type === "winter" && <WinterBackground />}
            {background.type === "winter" && <MariaCarey />}
        </div>
    )
};
