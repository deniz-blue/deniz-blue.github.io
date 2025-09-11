import { PropsWithChildren, useContext, useEffect, useRef } from "react";
import { SoulContext } from "./SoulContext";
import { Box } from "@mantine/core";
import { SoulAnchor } from "./positioning";

type Measurement = number | string;

interface Mods {
    anchor?: SoulAnchor;
    zIndex?: number;
    mb?: Measurement;
    mt?: Measurement;
    ml?: Measurement;
    mr?: Measurement;
    blur?: boolean;
};

export const SoulSelectable = ({
    children,
    disabled,
    anchor,
    zIndex,
    mb,
    ml,
    mr,
    mt,
    blur,
}: PropsWithChildren<{
    disabled?: boolean;
} & Mods>) => {
    const ref = useRef<HTMLDivElement>(null);
    const { registerSelectable, setSelected } = useContext(SoulContext);

    // useEffect(() => {
    //     if (!ref.current) return;

    //     const div = ref.current;
    //     const abort = new AbortController();
    //     const signal = abort.signal;

    //     div.addEventListener("mouseenter", () => setSelected(ref.current), { signal });

    //     return () => abort.abort();
    // }, [ref]);

    return (
        <Box
            ref={!disabled ? registerSelectable : null}
            className="soul-selectable"
            tabIndex={0}
            mod={{
                "data-pos": anchor,
                "data-zindex": zIndex,
                "data-mt": mt,
                "data-mb": mb,
                "data-ml": ml,
                "data-mr": mr,
                "data-blur": blur,
            }}
        >
            {children}
        </Box>
    );
};
