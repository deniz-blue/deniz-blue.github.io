import { Stack } from "@mantine/core";
import { useContext, useEffect, useRef } from "react";
import { useUpdateInterval } from "~/components/features/bg/farewell/useUpdateInterval";
import { MusicPlayerContext } from "~/components/features/music/MusicPlayerContext";
import { magicFunction, useAmplitude } from "~/components/features/music/temp";
import { useAudioFFT } from "~/components/features/music/hooks/useAudioFFT";

export const MusicPopout = () => {
    const fft = useAudioFFT();
    const amp = useAmplitude();

    const ref = useRef<HTMLCanvasElement | null>(null);

    useUpdateInterval({
        update: (dt, elapsed) => {
            if (!ref.current) return;
            let arr = fft.current;

            let ctx = ref.current.getContext("2d");
            if (!ctx) return;
            ctx.fillStyle = 'rgb(200, 200, 200)';
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            // let avg = arr.reduce((a,b)=>a+b,0) / arr.length;
            let bass = amp.current;

            ctx.strokeStyle = "rgb(180, 10, 223)";
            ctx.beginPath();
            ctx.moveTo(0,bass);
            ctx.lineTo(ctx.canvas.width,bass);
            ctx.stroke();
            
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgb(0, 0, 0)';
            ctx.beginPath();
            let sliceWidth = ctx.canvas.width * 1.0 / arr.length;
            let x = 0;
            for (var i = 0; i < arr.length; i++) {

                var v = arr[i] / 128.0;
                var y = v * ctx.canvas.height / 2;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                x += sliceWidth;
            };
            ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
            ctx.stroke();
        },
    })

    return (
        <Stack>
            <canvas
                ref={ref}
            />
        </Stack>
    );
};
