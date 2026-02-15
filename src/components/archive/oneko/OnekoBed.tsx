import { OnekoContext } from "./OnekoAPI";
import { useContext, useEffect, useRef } from "react";
import { useWindowEvent } from "@mantine/hooks";
import { Coord } from "@/src/types";

export const OnekoBed = ({
    id,
    offset,
}: {
    id: string;
    offset?: Coord;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { setBed } = useContext(OnekoContext);

    const set = () => {
        if (!ref.current) return;
        setBed(id, ref.current);
    }

    useEffect(() => {
        set();
        return () => setBed(id);
    }, [ref]);

    return (
        <div
            ref={ref}
            style={{
                position: "relative",
                userSelect: "none",
                top: `${offset?.y || 0}px`,
                left: `${offset?.x || 0}px`,
            }}
        />
    )
}
