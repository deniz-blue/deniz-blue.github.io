import { useAppContext } from "../../contexts/app/AppContext";
import { useBackgroundContext } from "../../contexts/background/BackgroundContext";
import { DepthBackground } from "./depth/DepthBackground";
import { ManBackground } from "./man/ManBackground";
import { OneShotBackground } from "./oneshot/OneshotBackground";
import { RainForeground } from "./rain/RainForeground";
import { RefugeBackground } from "./refuge/RefugeBackground";
import { StarfieldBackground } from "./starfield/StarfieldBackground";

export const PageBackground = () => {
    const [{ type }] = useBackgroundContext();
    const [{ rain }] = useAppContext();

    return (
        <div style={{ position: "fixed", zIndex: -1 }}>
            {rain && <RainForeground />}

            {type === "starfield" && <StarfieldBackground />}
            {type === "oneshot" && <OneShotBackground />}
            {type === "depth" && <DepthBackground />}
            {type === "man" && <ManBackground />}
            {type === "refuge" && <RefugeBackground />}
        </div>
    )
};
