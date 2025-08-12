import { useContext } from "react";
import SOUL from "./spr/SOUL.png";
import IMAGE_SOUL_BLUR from "./spr/IMAGE_SOUL_BLUR.png";
import { SoulContext } from "./SoulContext";
import "./soul.css";

export const SoulElement = () => {
    const { ref } = useContext(SoulContext);

    return (
        <div
            id="SOUL"
            ref={ref}
        >
            <div
                className="soul heart"
                style={{
                    backgroundImage: `url("${SOUL}")`,
                }}
            />
            <div
                className="soul blur"
                style={{
                    backgroundImage: `url("${IMAGE_SOUL_BLUR}")`,
                }}
            />
        </div>
    );
};
