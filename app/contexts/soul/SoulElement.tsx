import { useContext } from "react";
import SOUL from "./SOUL.png";
import { SoulContext } from "./SoulContext";
import "./soul.css";

export const SoulElement = () => {
    const { ref } = useContext(SoulContext);

    return (
        <div
            id="SOUL"
            style={{
                backgroundImage: `url("${SOUL}")`,
            }}
            ref={ref}
        />
    );
};
