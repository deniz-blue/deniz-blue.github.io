import { Box } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import "./swapper.css";

export const Swapper = ({
    content,
}: {
    content?: React.ReactNode;
}) => {
    const [current, setCurrent] = useState<0 | 1>(0);
    const [pair, setPair] = useState<[React.ReactNode, React.ReactNode]>([
        content,
        null,
    ]);
    const firstRef = useRef<HTMLDivElement>(null);
    const secondRef = useRef<HTMLDivElement>(null);

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

        const duration = 500;
        fadeIn.current?.animate({
            opacity: [0, 1],
        }, {
            fill: "forwards",
            duration,
        });
        fadeOut.current?.animate({
            opacity: [1, 0],
        }, {
            fill: "forwards",
            duration,
        });
    }, [current, firstRef, secondRef]);

    return (
        <Box className="swapper-wrap">
            {pair.map((element, i) => (
                <div
                    key={i}
                    className={"swapper-content" + (i == current ? " swapper-active" : "")}
                    aria-hidden={i != current}
                    ref={i ? secondRef : firstRef}
                >
                    {element}
                </div>
            ))}
        </Box>
    )
};
