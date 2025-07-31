import { PropsWithChildren, useContext, useEffect, useRef } from "react";
import { SoulContext, SoulPosition } from "./SoulContext";
import { useHover, useMergedRef } from "@mantine/hooks";
import { Box } from "@mantine/core";

export const SoulSelectable = ({
    children,
    disabled,
    pos,
}: PropsWithChildren<{
    disabled?: boolean;
    pos?: SoulPosition;
}>) => {
    const ref = useRef<HTMLDivElement>(null);
    const { selectables, setSelected } = useContext(SoulContext);

    // useEffect(() => {
    //     console.log({ hoverRef, hovered })
    //     if(hoverRef.current && hovered) {
    //         let rect = hoverRef.current.getBoundingClientRect();
    //         moveTo({
    //             x: rect.x - (11 + 4),
    //             y: rect.y + (rect.height/2),
    //         });
    //     }
    // }, [hovered]);

    useEffect(() => {
        if (disabled) {
            selectables.delete(ref);
        } else {
            selectables.add(ref);
            return () => void selectables.delete(ref);
        }
    }, [ref, disabled]);

    useEffect(() => {
        if(!ref.current) return;

        const div = ref.current;
        const abort = new AbortController();
        const signal = abort.signal;

        div.addEventListener("mouseenter", () => setSelected(ref), { signal });

        return () => abort.abort();
    }, [ref]);

    return (
        <Box
            ref={ref}
            className="soul-selectable"
            mod={{
                "data-pos": pos,
            }}
        >
            {children}
        </Box>
    );
};
