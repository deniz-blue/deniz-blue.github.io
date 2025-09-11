import { encode, UnencodedFrame } from "modern-gif";
import workerUrl from 'modern-gif/worker?url'
import { useBackgroundContext } from "../../contexts/background/BackgroundContext";
import { useEffect, useRef, useState } from "react";
import IMAGE_DEPTH_4 from "./IMAGE_DEPTH_4.png";
import { Button } from "@mantine/core";

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

const areUint8ArraysEqual = (a: ImageDataArray, b: ImageDataArray) => {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

const captureFrame = async (ctx: OffscreenCanvasRenderingContext2D) => {
    await new Promise(requestAnimationFrame);
    return ctx.getImageData(0, 0, 320, 240);
};





let sprite: HTMLImageElement = typeof window !== "undefined" ? new Image() : {} as any;
sprite.src = IMAGE_DEPTH_4;



const generate = async () => {
    const offscreen = new OffscreenCanvas(320, 240);
    const ctx = offscreen.getContext("2d")!;

    let OB_DEPTH = 0;
    let obacktimer = 0;
    let OBM = 0.5;

    let instances: DEVICE_OBACK_4[] = [];

    const update = () => {
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
    };

    const draw = () => {
        ctx.clearRect(0, 0, 320, 240)
        ctx.fillStyle = "#000000ff"
        ctx.globalAlpha = 1
        ctx.fillRect(0,0,320,240)

        if (!sprite.complete) return;
        for (let dv of instances) {
            if (!dv.shouldDraw()) continue;
            let alpha = dv.getAlpha();

            // ctx.globalCompositeOperation = "multiply";
            ctx.globalAlpha = alpha;
            const dw = sprite.width * dv.xstretch;
            const dh = sprite.height * dv.ystretch;
            ctx.drawImage(
                sprite,
                160 - dw / 2,
                120 - dh / 2,
                dw,
                dh
            );
        }
    };

    const delay = 1000 / 30;

    const capture = () => {
        console.log("capture()");
        frames.push({
            data: ctx.getImageData(0, 0, 320, 240).data.slice(),
            delay,
        })
    };

    const frames: UnencodedFrame[] = [];

    // warmup
    Array(100).fill(0).forEach(update);

    let c = 500;
    for (let i = 0; i < c; i++) {
        update();
        draw();
        capture();

        if (!!i && areUint8ArraysEqual(frames[0].data as ImageDataArray, frames[frames.length - 1].data as ImageDataArray)) {
            console.log("eq!", i);
            break;
        }
    }

    encode({
        frames,
        format: "blob",
        width: 320,
        height: 240,
        workerUrl,
        debug: true,
    }).then(output => {
        console.log("done rendering!")
        console.log(output)
        const blob = new Blob([output], { type: 'image/gif' })
        console.log(blob)
        let url = URL.createObjectURL(blob)
        console.log(url)
        window.open(url)
    }).catch(e => {
        console.error(e)
    })

    console.log("rendering")
};










export default function TestPage() {
    const ref = useRef<HTMLCanvasElement>(null);
    const [{ }, setBackground] = useBackgroundContext();

    useEffect(() => {
        setBackground({ type: "null" })
    }, []);

    return (
        <div>
            <canvas
                width="320"
                height="240"
                ref={ref}
                style={{
                    backgroundColor: "black",
                }}
            />

            <Button
                onClick={generate}
            >
                generate
            </Button>
            {/* <Button
                onClick={tick}
            >
                tick
            </Button>
            <Button
                onClick={() => {
                    new Array(100).fill(0).forEach(tick)
                }}
            >
                tick (100)
            </Button> */}
        </div>
    )
}
