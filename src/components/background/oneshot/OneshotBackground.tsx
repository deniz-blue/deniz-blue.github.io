import { useMemo } from "react";
import { deterministicRandom } from "../../../utils/deterministicRandom";
import { useAppFlagsStore } from "../../../stores/useAppFlagsStore";
import "./oneshot.css";
import { useBackgroundStore } from "../PageBackground";

export const OneShotBackground = () => {
    const sunShattered = useAppFlagsStore(store => store.sunShattered);
    const withoutNiko = useBackgroundStore(store => store.background.type == "oneshot" && store.background.data.withNiko === false);

    const makeSquares = (rand: () => number) => {
        return [1, -1].map((dir) => (
            Array(500).fill(0).map((_, i) => {
                const rawTop = ((rand() / 2) * 100 * dir + (dir == -1 ? 100 : 0));
                const top = `${rawTop}%`;

                const distFromMid = Math.abs(rawTop - 50) / 50;

                const baseSize = 2;
                const maxExtra = 10;
                const size = baseSize + distFromMid * maxExtra;

                if (rand() > distFromMid) {
                    return null; // don’t render this square
                }

                const opacity = distFromMid * 0.5;
                const animrand = rand();

                return {
                    key: dir * (i + 1),
                    color: (
                        ((dir * (rand() > 0.2 ? 1 : -1)) > 0) ? "#97257a" : "#7463aa"
                    ),
                    size,
                    top,
                    left: (rand() * 110) - 5 + "%",
                    opacity,
                    animrand,
                    dir,
                };
            })
        )).flat().filter(x => !!x)
    };

    const values = useMemo(() => makeSquares(deterministicRandom()), []);

    return (
        <div
            className="scrollableBackground fullSize"
            style={{
                backgroundImage: "linear-gradient(#250630, #63173d)",
            }}
        >
            {values.map(({ key, size, color, top, left, opacity, animrand, dir }) => (
                <div
                    className="oneshot-square"
                    key={key}
                    style={{
                        backgroundColor: color,
                        opacity,
                        width: size,
                        height: size,
                        position: "absolute",
                        top,
                        left,
                        ["--animrand" as any]: (animrand * 100) + "ms",
                        ["--dir" as any]: dir,
                    }}
                />
            ))}

            {!withoutNiko && <img
                src="/assets/img/detail/oneshot/NikoPromoTransparent.png"
                style={{
                    position: "absolute",
                    bottom: "calc(-60px)",
                    maxHeight: "200px",
                    maxWidth: "70vw",
                    marginLeft: "1rem",
                }}
            />}

            <div
                className="pageBackground"
                style={{
                    // transition: "all 1000ms cubic",
                    opacity: sunShattered ? 1 : 0,
                    backgroundColor: "black",
                    zIndex: 2,
                }}
            >
                {!withoutNiko && <img
                    src="/assets/img/detail/oneshot/NikoDead.png"
                    style={{
                        position: "absolute",
                        bottom: "0px",
                        maxHeight: "200px",
                        maxWidth: "80vw",
                        marginLeft: "1rem",
                    }}
                />}
            </div>

            {/* <div id="jackenstein-jackolantern" /> */}
        </div>
    )
};
