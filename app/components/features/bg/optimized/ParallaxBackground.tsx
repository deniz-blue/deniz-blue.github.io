import { useEffect, useRef } from "react";
import { generateStarfieldImage } from "./generateImage";
import { vec2 } from "@alan404/vec2";

export const ParallaxBackground = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!ref.current) return;

        generateStarfieldImage({
            config: {
                color: "ab6ffa", scroll: vec2(0.3, 0.3)
            },
        }).then(blob => {
            let src = URL.createObjectURL(blob);
            ref.current!.style.backgroundImage = `url(${src})`;
            ref.current!.style.backgroundRepeat = `repeat`;
            ref.current!.style.width = `100vw`;
            ref.current!.style.height = `100vh`;
        })

    }/* , [ref] */);

    return (
        <div>
            <div ref={ref} />
        </div>
    )
};
