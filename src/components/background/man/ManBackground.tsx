import TREE from "./tree.gif";
import MAN from "./man.ogg";
import { useAudioUnlocker } from "../../../hooks/useAudioUnlocker";

export const ManBackground = () => {
    const audioRef = useAudioUnlocker();

    return (
        <div
            className="pageBackground"
        >
            <div
                className="fullscreen"
                style={{
                    backgroundImage: `url("${TREE}")`,
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                }}
            />

            <audio
                src={MAN}
                loop
                autoPlay
                ref={audioRef}
            />
        </div>
    )
};
