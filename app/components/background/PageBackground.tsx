import { useBackgroundContext } from "../../contexts/background/BackgroundContext";
import { DepthBackground } from "./depth/DepthBackground";
import { ManBackground } from "./man/ManBackground";
import { OneShotBackground } from "./oneshot/OneshotBackground";
import { RefugeBackground } from "./refuge/RefugeBackground";
import { StarfieldBackground } from "./starfield/impl/StarfieldBackground";

export const PageBackground = () => {
    const [{ type }] = useBackgroundContext();

    return (
        <div style={{ position: "fixed", zIndex: -1 }}>
            {type === "starfield" && <StarfieldBackground key={Date.now()} />}
            {type === "oneshot" && <OneShotBackground />}
            {type === "depth" && <DepthBackground />}
            {type === "man" && <ManBackground />}
            {type === "refuge" && <RefugeBackground />}
        </div>
    )
};
