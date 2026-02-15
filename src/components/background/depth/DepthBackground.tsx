import IMAGE_DEPTH from "./IMAGE_DEPTH.png";
import IMAGE_DEPTH_4 from "./IMAGE_DEPTH_4.png";
import AUDIO_ANOTHERHIM from "./AUDIO_ANOTHERHIM.ogg";
import "./style.css";
import { useDocumentTitle } from "@mantine/hooks";
import { useCanvas } from "../../../hooks/useCanvas";
import { useAudioUnlocker } from "../../../hooks/useAudioUnlocker";
import { vec2 } from "@alan404/vec2";
import { useCallback } from "react";

class DEVICE_OBACK_4 {
    siner: number;
    alpha: number;
    xstretch: number;
    ystretch: number;
    o_insurance: number;
    depth: number;
    b_insurance: number;
    OBSPEED: number;

    constructor() {
        this.siner = 0;
        this.alpha = 0.2;
        this.xstretch = 1;
        this.ystretch = 1;
        this.o_insurance = 0;
        this.depth = 4 + 0;
        this.OBSPEED = 0.02;
        this.b_insurance = -0.2;
    }

    destroy() { }

    step() {
        this.siner += 1;

        if (this.OBSPEED > 0)
            this.alpha = Math.sin(this.siner / 34) * 0.2;

        this.ystretch += this.OBSPEED;
        this.xstretch += this.OBSPEED;

        if (this.b_insurance < 0)
            this.b_insurance += 0.01;

        if (this.ystretch > 2) {
            this.o_insurance += 0.01;

            if (this.o_insurance >= 0.5)
                this.destroy();
        }
    }

    shouldDraw() {
        // return this.siner > 2;
        // MODIFIED
        return this.siner < 150 && this.siner > 2;
    }

    getAlpha() {
        return Math.max(0, ((0.2 + this.alpha) - this.o_insurance) + this.b_insurance);
    }
}

export const DepthBackground = () => {
    useDocumentTitle("ARE WE CONNECTED?");

    const init = useCallback((ctx: CanvasRenderingContext2D) => {
        // ctx.globalCompositeOperation = "overlay";

        let instances: DEVICE_OBACK_4[] = [];

        let sprite = new Image();
        // sprite.src = IMAGE_DEPTH;
        sprite.src = IMAGE_DEPTH_4;

        let OB_DEPTH = 0;
        let obacktimer = 0;
        let OBM = 0.5;

        return {
            update() {
                OB_DEPTH += 1;
                obacktimer += OBM;

                if (obacktimer >= 20) {
                    let DV = new DEVICE_OBACK_4();
                    DV.depth = 5 + OB_DEPTH;
                    DV.OBSPEED = 0.01 * OBM;

                    DV.destroy = () => instances = instances.filter(x => x !== DV);
                    instances.unshift(DV);

                    if (OB_DEPTH >= 60000)
                        OB_DEPTH = 0;

                    obacktimer = 0;
                }

                for (let dv of instances) dv.step();
            },

            draw() {
                if (!sprite.complete) return;
                for (let dv of instances) {
                    if (!dv.shouldDraw()) continue;
                    let alpha = dv.getAlpha();

                    // xdrawSpr(1 + dv.xstretch, 1 + dv.ystretch, alpha);
                    // xdrawSpr(-1 - dv.xstretch, 1 + dv.ystretch, alpha);
                    // xdrawSpr(-1 - dv.xstretch, -1 - dv.ystretch, alpha);
                    // xdrawSpr(1 + dv.xstretch, -1 - dv.ystretch, alpha);

                    // ctx.globalCompositeOperation = "multiply";
                    ctx.globalAlpha = alpha;
                    const dw = sprite.width*dv.xstretch;
                    const dh = sprite.height*dv.ystretch;
                    ctx.drawImage(
                        sprite,
                        160 - dw/2,
                        120 - dh/2,
                        dw,
                        dh
                    );
                    // ctx.globalCompositeOperation = "source-over";
                }
            },
        };
    }, []);

    const { ref } = useCanvas(init, {
        size: vec2(320, 240),
    });

    const audioRef = useAudioUnlocker();

    return (
        <div
            className="pageBackground"
        >
            <canvas
                className="pageBackground"
                style={{
                    objectFit: "cover",
                    // objectFit: "contain",
                    imageRendering: "crisp-edges",
                }}
                ref={ref}
            />

            <audio
                src={AUDIO_ANOTHERHIM}
                ref={audioRef}
                autoPlay
                loop
            />
        </div>
    )
};
