import mariah from "./bg/mariah.png";
import mariahogg from "./audio/mariah.ogg";
import { useAudioUnlocker } from "../../../hooks/useAudioUnlocker";
import { useEffect } from "react";

export const MariaCarey = () => {
    const ref = useAudioUnlocker();

    useEffect(() => {
        if (ref.current)
            ref.current.volume = 0.1;
    }, [ref]);

    return (
        <div className="pageBackground fullscreen">
            <div
                className="fullscreen"
                style={{
                    backgroundImage: `url(${mariah})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    imageRendering: "pixelated",
                    opacity: "0.05",
                }}
            />

            <audio
                ref={ref}
                src={mariahogg}
                autoPlay
                loop
            />
        </div>
    )
};
