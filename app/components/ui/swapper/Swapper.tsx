import { Box } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import "./swapper.css";

export const Swapper = ({
    content,
    duration = 500,
    styles,
}: {
    content?: React.ReactNode;
    duration?: number;
    styles?: {
        wrapper?: React.CSSProperties;
        content?: React.CSSProperties;
    };
}) => {
    const [current, setCurrent] = useState<0 | 1>(0);
    const [pair, setPair] = useState<[React.ReactNode, React.ReactNode]>([
        content,
        null,
    ]);
    const firstRef = useRef<HTMLDivElement>(null);
    const secondRef = useRef<HTMLDivElement>(null);
    const fadeInAnimRef = useRef<Animation>(null);
    const fadeOutAnimRef = useRef<Animation>(null);

    useEffect(() => {
        setCurrent(oldCurrent => {
            const newCurrent = oldCurrent ? 0 : 1;

            setPair(pair => pair.map((x, i) => (
                (i == newCurrent) ? (content ?? null) : x
            )) as [React.ReactNode, React.ReactNode]);

            return newCurrent;
        });
    }, [content]);

    useEffect(() => {
        const fadeIn = current == 0 ? firstRef : secondRef;
        const fadeOut = current == 0 ? secondRef : firstRef;

        fadeOutAnimRef.current?.cancel();

        fadeInAnimRef.current = fadeIn.current?.animate({
            opacity: [0, 1],
        }, {
            fill: "forwards",
            duration,
        }) ?? null;

        fadeOutAnimRef.current = fadeOut.current?.animate({
            opacity: [1, 0],
        }, {
            fill: "forwards",
            duration,
        }) ?? null;

        fadeOutAnimRef.current?.addEventListener("finish", () => {
            setPair(pair => pair.map((x, i) => (
                (i === current) ? x : null
            )) as [React.ReactNode, React.ReactNode]);
        })
    }, [current, firstRef, secondRef, duration]);

    return (
        <Box className="swapper-wrap" style={styles?.wrapper}>
            {pair.map((element, i) => (
                <div
                    key={i}
                    className={"swapper-content" + (i == current ? " swapper-active" : "")}
                    aria-hidden={i != current}
                    ref={i ? secondRef : firstRef}
                    style={styles?.content}
                >
                    {element}
                </div>
            ))}
        </Box>
    )
};
