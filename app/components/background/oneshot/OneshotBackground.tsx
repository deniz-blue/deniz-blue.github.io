import { useMemo, useState } from "react";
import { useFeatures } from "../../base/FeaturesContext";
import { deterministicRandom } from "../../../utils/deterministicRandom";
import { useInterval } from "@mantine/hooks";
import "./oneshot.css";

export const OneShotBackground = () => {
    const { myBurdenIsDead } = useFeatures();

    const makeSquares = (rand: () => number) => {
        return [1, -1].map((dir) => (
            Array(256).fill(0).map((_, i) => {
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
                };
            })
        )).flat().filter(x => !!x)
    };

    const [rand] = useState(() => deterministicRandom());

    const [values, setValues] = useState(() => makeSquares(rand));

    // useInterval(() => {
    //     setValues(makeSquares(rand))
    // }, 50, { autoInvoke: true })

    return (
        <div
            className="pageBackground"
            style={{
                backgroundImage: "linear-gradient(#250630, #63173d)",
                height: "100vh",
            }}
        >
            {values.map(({ key, size, color, top, left, opacity, animrand }) => (
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
                        ["--animrand" as any]: (animrand*100) + "ms",
                    }}
                />
            ))}

            <img
                src="/assets/img/detail/oneshot/NikoPromoTransparent.png"
                style={{
                    position: "absolute",
                    bottom: "calc(-60px)",
                    maxHeight: "200px",
                    maxWidth: "70vw",
                    marginLeft: "1rem",
                }}
            />

            <div
                className="pageBackground"
                style={{
                    // transition: "all 1000ms cubic",
                    opacity: myBurdenIsDead ? 1 : 0,
                    backgroundColor: "black",
                    zIndex: 2,
                }}
            >
                <img
                    src="/assets/img/detail/oneshot/NikoDead.png"
                    style={{
                        position: "absolute",
                        bottom: "0px",
                        maxHeight: "200px",
                        maxWidth: "80vw",
                        marginLeft: "1rem",
                    }}
                />
            </div>
        </div>
    )
};
