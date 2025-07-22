import IMAGE_DEPTH from "./IMAGE_DEPTH.png";
import AUDIO_ANOTHERHIM from "./AUDIO_ANOTHERHIM.ogg";
import "./style.css";
import { useDocumentTitle } from "@mantine/hooks";
import { useCanvas } from "../../../hooks/useCanvas";
import { useAudioUnlocker } from "../../../hooks/useAudioUnlocker";

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

    draw() {
        if (this.siner > 2) {

        }
    }

    shouldDraw() {
        return this.siner > 2;
    }

    getAlpha() {
        return ((0.2 + this.alpha) - this.o_insurance) + this.b_insurance;
    }
}

export const DepthBackground = () => {
    useDocumentTitle("ARE WE CONNECTED?");

    // const overlayCount = 6;
    // const overlayDuration = 10; // seconds
    // const overlayDelay = 2;     // seconds

    const { ref } = useCanvas((ctx) => {
        ctx.canvas.width = 640;
        ctx.canvas.height = 480;

        let instances = new Set<DEVICE_OBACK_4>();

        let sprite = new Image();
        sprite.src = IMAGE_DEPTH;

        let OB_DEPTH = 0;
        let obacktimer = 0;
        let OBM = 0.5;

        const xdrawSpr = (
            xscale: number,
            yscale: number,
            alpha: number,
        ) => {
            const width = sprite.width;
            const height = sprite.height;
            const x = ctx.canvas.width / 2;
            const y = ctx.canvas.height / 2;

            ctx.save();
            ctx.globalAlpha = alpha;

            ctx.translate(x, y);
            ctx.scale(xscale, yscale);

            ctx.drawImage(sprite, -width / 2, -height / 2);

            ctx.restore();
        };

        return {
            update() {
                OB_DEPTH += 1;
                obacktimer += OBM;

                if (obacktimer >= 20) {
                    let DV = new DEVICE_OBACK_4();
                    DV.depth = 5 + OB_DEPTH;
                    DV.OBSPEED = 0.01 * OBM;

                    DV.destroy = () => instances.delete(DV);
                    instances.add(DV);

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

                    xdrawSpr(1 + dv.xstretch, 1 + dv.ystretch, alpha);
                    xdrawSpr(-1 - dv.xstretch, 1 + dv.ystretch, alpha);
                    xdrawSpr(-1 - dv.xstretch, -1 - dv.ystretch, alpha);
                    xdrawSpr(1 + dv.xstretch, -1 - dv.ystretch, alpha);
                }
            },
        };
    }, {
        handleResize: false,
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
