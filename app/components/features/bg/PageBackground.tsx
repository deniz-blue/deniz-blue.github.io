import { useEffects } from "./lib/useEffects";
// import { ParallaxBackground } from "./optimized/ParallaxBackground";

export const PageBackground = () => {
    const { ref } = useEffects({});

    return (
        <div
            className="pageBackground"
        >
            {/* <ParallaxBackground /> */}
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
