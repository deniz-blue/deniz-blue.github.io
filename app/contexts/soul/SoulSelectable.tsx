import { PropsWithChildren, useContext, useEffect, useRef } from "react";
import { SoulContext } from "./SoulContext";
import { useHover, useMergedRef } from "@mantine/hooks";
import { Box } from "@mantine/core";
import { SoulAnchor } from "./positioning";

type Measurement = number | string;
export const SoulSelectable = ({
    children,
    disabled,
    anchor,
    zIndex,
    mb,
    ml,
    mr,
    mt,
}: PropsWithChildren<{
    disabled?: boolean;
    anchor?: SoulAnchor;
    zIndex?: number;
    mb?: Measurement;
    mt?: Measurement;
    ml?: Measurement;
    mr?: Measurement;
}>) => {
    const ref = useRef<HTMLDivElement>(null);
    const { selectables, setSelected } = useContext(SoulContext);

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
                "data-pos": anchor,
                "data-zindex": zIndex,
                "data-mt": mt,
                "data-mb": mb,
                "data-ml": ml,
                "data-mr": mr,
            }}
        >
            {children}
        </Box>
    );
};
