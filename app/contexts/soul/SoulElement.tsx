import { useContext } from "react";
import SOUL from "./SOUL.png";
import { SoulContext } from "./SoulContext";

export const SoulElement = () => {
    const { ref } = useContext(SoulContext);

    return (
        <div
            className="fullscreen"
            style={{ zIndex: -1 }}
        >
            <div
                id="SOUL"
                style={{
                    width: 22,
                    height: 22,
                    backgroundImage: `url("${SOUL}")`,
                    transform: "translate(-100px, -100px)", // might become an issue
                    transition: "transform 100ms",
                }}
                ref={ref}
            />
        </div>
    );
};
