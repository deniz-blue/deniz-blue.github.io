import { PropsWithChildren, RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./automarquee.css";

export const useWidthOverflow = (ref: RefObject<HTMLElement | null>, opts?: {
    deps?: React.DependencyList;
}) => {
    const [overflown, setOverflown] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        setOverflown(
            ref.current.offsetWidth < ref.current.scrollWidth
        );
    }, [...(opts?.deps ?? [])]);

    return overflown;
};

export const AutoMarquee = ({
    children,
}: PropsWithChildren) => {
    const outerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);

    const overflown = useWidthOverflow(measureRef, { deps: [children ?? null] });

    const contentWidth = measureRef.current?.scrollWidth ?? 0;
    const s = {
        animation: "",
        animationDuration: (contentWidth * 25) + "ms",
        whiteSpace: "nowrap",
        display: "inline-block",
    } as React.CSSProperties;

    return (
        <div
            ref={outerRef}
            className={overflown ? "marquee" : ""}
            style={{
                width: "100%",
                overflowX: "hidden",
                whiteSpace: "nowrap",
                position: "relative",
            }}
        >
            <div ref={measureRef} style={{ width: "100%", whiteSpace: "nowrap", overflow: "hidden" }}>
                <div style={s} className="marqueeContent">
                    {children}
                </div>
            </div>

            {overflown && (
                <div aria-hidden className="marqueeContent" style={{
                    ...s,
                    position: "absolute",
                    left: `calc(${contentWidth}px + var(--gap))`,
                }}>
                    {children}
                </div>
            )}
        </div>
    );
};
