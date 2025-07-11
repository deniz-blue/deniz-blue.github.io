import { useMemo } from "react";
import { useFeatures } from "../../../base/FeaturesContext";

export const OneShotBackground = () => {
    const { myBurdenIsDead } = useFeatures();

    const values = useMemo(() => {
        return [1, -1].map((dir) => (
            Array(128).fill(0).map((_, i) => {
                const size = Math.floor(Math.random() * 4) * 5;
                return {
                    key: dir * (i+1),
                    color: dir > 0 ? "#97257a" : "#7463aa",
                    size,
                    top: ((Math.random() / 2) * 100 + (dir == 1 ? 80 : 0) - 20) + "%",
                    left: (Math.random() * 100) + "%",
                };
            })
        )).flat()
    }, []);

    return (
        <div
            className="pageBackground"
            style={{
                backgroundImage: "linear-gradient(#250630, #63173d)",

            }}
        >
            {values.map(({ key, size, color, top, left }) => (
                <div
                    key={key}
                    style={{
                        backgroundColor: color,
                        opacity: 0.7,
                        width: size,
                        height: size,
                        position: "absolute",
                        top,
                        left,
                    }}
                />
            ))}

            <img
                src="/assets/img/detail/oneshot/NikoPromoTransparent.png"
                style={{
                    position: "absolute",
                    bottom: "-60px",
                    maxHeight: "200px",
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
                        marginLeft: "1rem",
                    }}
                />
            </div>
        </div>
    )
};
