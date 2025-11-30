import spire from "./spire.png"
import arches from "./arches.png"
import buttress from "./buttress.png"
import { useEffect, useRef } from "react";
import "./styles.css";
import { Box, Group } from "@mantine/core";

export const SanctuaryBackground = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;
        const upd = () => {
            el.style.setProperty("--scroll-y", document.documentElement.scrollTop.toString());
        }
        upd();
        const ctrl = new AbortController();
        window.addEventListener("scroll", upd, { signal: ctrl.signal });
        return () => ctrl.abort();
    }, [ref.current]);

    return (
        <div ref={ref} className="SanctuaryBackground">
            <Box className="parallax fade" w="100%" mt={15} style={{ "--depth": 0.7, opacity: 0.7 }}>
                <Group gap={0} align="center" w="100%">
                    <Box className="arches fade" flex={1} ml={-50} />
                    <Box className="spire fade" />
                    <Box className="arches fade" w={100} />
                </Group>
            </Box>
            <Box className="parallax fade" w="100%" mt={120} style={{ "--depth": 0.6, opacity: 0.9 }}>
                <Group gap={0} align="end" w="100%">
                    <Box className="arches" w={200} />
                    <Box className="spire" />
                    <Box className="arches" flex={1} />
                </Group>
            </Box>
            <Box className="parallax fade" mt={800} w="100%">
                <Group justify="center" gap={0} align="top">
                    <Box className="spire fade" ml={280} />
                    <Box className="buttress fade" mt={200} />
                </Group>
            </Box>
        </div>
    )
};
