import IMAGE_DEPTH_BG from "./IMAGE_DEPTH_BG.png";
import IMAGE_DEPTH_OVERLAY from "./DEPTH_OVERLAY.png";
import soul from "./SOUL_overworld.png";
import "./style.css";
import { Image } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";

export const DepthBackground = () => {
    useDocumentTitle("ARE WE CONNECTED?");

    return (
        <div
            className="pageBackground"
            style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                justifyItems: "center",
                backgroundImage: `url("${IMAGE_DEPTH_BG}")`,
                backgroundPosition: "center center",
            }}
        >
            {Array(12).fill(0).map((_, i) => (
                <Image
                    key={i}
                    className="depthOverlay"
                    style={{ "--i": i.toString() }}
                    src={IMAGE_DEPTH_BG}
                />
            ))}

            <img
                src={soul}
                style={{
                    zIndex: 10,
                    opacity: 0.7,
                }}
            />
        </div>
    )
};
