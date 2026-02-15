import { create } from "zustand";
import { useAppFlagsStore } from "../../stores/useAppFlagsStore";
import { DepthBackground } from "./depth/DepthBackground";
import { ManBackground } from "./man/ManBackground";
import { OneShotBackground } from "./oneshot/OneshotBackground";
import { RainForeground } from "./rain/RainForeground";
import { RefugeBackground } from "./refuge/RefugeBackground";
import { StarfieldBackground } from "./starfield/StarfieldBackground";
import { Enum } from "@alan404/enum";
import { WinterBackground } from "./winter/WinterBackground";
import { MariaCarey } from "./winter/MariaCarey";
import { AuroraBackground } from "./aurora/AuroraBackground";
import { Swapper } from "../ui/swapper/Swapper";
import { useMemo } from "react";
import { SanctuaryBackground } from "./sanctuary/SanctuaryBackground";

export type Background = Enum<{
    null: { fade?: boolean };
    depth: {};
    man: {};
    starfield: {};
    oneshot: { withNiko?: boolean };
    refuge: {};
    winter: {};
    ender: {};
    aurora: {};
    sanctuary: {};
}>;

export const defaultBackground: Background = {
    type: "null",
    data: {},
};

export const useBackgroundStore = create<{
    background: Background;
    setBackground: (bg: Background) => void;
}>()((set, get) => ({
    background: defaultBackground,
    setBackground: (background) => set(state => ({ background })),
}))

export const PageBackground = () => {
    const background = useBackgroundStore(store => store.background);
    const rain = useAppFlagsStore(store => store.rain);

    const content = useMemo(() => (
        <>
            {rain && <RainForeground />}

            {background.type === "starfield" && <StarfieldBackground />}
            {background.type === "oneshot" && <OneShotBackground />}
            {background.type === "depth" && <DepthBackground />}
            {background.type === "man" && <ManBackground />}
            {background.type === "refuge" && <RefugeBackground />}
            {background.type === "winter" && <WinterBackground />}
            {background.type === "aurora" && <AuroraBackground />}
            {background.type === "sanctuary" && <SanctuaryBackground />}
        </>
    ), [JSON.stringify(background), rain])

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
            <Swapper
                content={content}
                duration={(background.type == "null" && background.data.fade !== true) ? 0 : 500}
                styles={{
                    wrapper: {
                        width: "100%",
                        height: "100%",
                    },
                    content: {
                        width: "100%",
                        height: "100%",
                    },
                }}
            />
        </div>
    )
};
