import { RefObject } from "react";
import SOUL from "./spr/SOUL.png";
import IMAGE_SOUL_BLUR from "./spr/IMAGE_SOUL_BLUR.png";
import { create } from "zustand";
import "./soul.css";

export const useSoulRef = create<{
    ref: RefObject<HTMLDivElement | null>;
}>()((get, set) => ({
    ref: { current: null },
}));

export const SoulElement = () => {
    const { ref } = useSoulRef();

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
