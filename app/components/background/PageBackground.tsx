import { useBackgroundContext } from "../../contexts/background/BackgroundContext";
import { DepthBackground } from "./depth/DepthBackground";
import { ManBackground } from "./man/ManBackground";
import { OneShotBackground } from "./oneshot/OneshotBackground";

export const PageBackground = () => {
    const [{ type }] = useBackgroundContext();

    return (
        <div>
            {/* {type === "starfield" && <StarfieldBackground />} */}
            {type === "oneshot" && <OneShotBackground />}
            {type === "depth" && <DepthBackground />}
            {type === "man" && <ManBackground />}
        </div>
    )
};
