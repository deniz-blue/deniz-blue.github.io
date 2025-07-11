import { useFarewellEffect } from "./useEffects";

export const FarewellBackground = () => {
    const { ref } = useFarewellEffect({});

    return (
        <div
            className="pageBackground"
            style={{
                backgroundImage: "url('/assets/img/detail/sky.png')",
                backgroundRepeat: "repeat",
                backgroundAttachment: "fixed",
            }}
        >
            <canvas
                className="pageBackground"
                style={{
                    width: `${100}vw`,
                    height: `${100}vh`,
                    imageRendering: "pixelated",
                }}
                ref={ref}
            />
        </div>
    );
};
