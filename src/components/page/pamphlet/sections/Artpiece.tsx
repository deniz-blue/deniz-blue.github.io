import { Box, Divider, Group, Image, Space, Stack, Text } from "@mantine/core";
import { ThetaDeltaSvg } from "../ThetaDeltaSvg";
import { Twemoji } from "~/components/ui/Twemoji";
import { PropsWithChildren } from "react";

export const ArtPiece = () => {
    return (
        <Stack align="center" py="sm" gap={4}>
            <Stack pos="relative" w="20rem" h="5rem" style={{ pointerEvents: "none", userSelect: "none" }}>
                <Stack pos="absolute" align="center" justify="center" w="100%" h="100%">
                    <Group gap={4}>
                        <Group gap={4} style={{ opacity: 0 }}>
                            <div style={{ transform: "scaleX(-1)" }}>
                                <Twemoji emoji="⬛" />
                            </div>
                            <Divider color="white" w="2rem" label="♡" className="noLabelMargin" />
                        </Group>
                        <Space w="9rem" />
                        <Group gap={4} style={{ opacity: 0 }}>
                            <Divider w="2rem" label="🌩" className="noLabelMargin" />
                            <Twemoji emoji="⬛" />
                        </Group>
                    </Group>
                </Stack>

                <Symbol x={2.2} y={-0.5}>
                    🖤☁️
                </Symbol>
                <Symbol x={-2.2} y={-0.5}>
                    🌊💜
                </Symbol>
                <Symbol x={-0.8} y={-1.8}>
                    🌸
                </Symbol>
                <Symbol x={0.8} y={-1.8}>
                    🍂
                </Symbol>
                <Symbol x={-2} y={0.8}>
                    ✨
                </Symbol>
                <Symbol x={-3.2} y={0.8}>
                    <Twemoji emoji="🐈‍⬛" />
                </Symbol>
                <Symbol x={2} y={0.8}>
                    ♠️
                </Symbol>
                <Symbol x={3.2} y={0.8}>
                    🐾
                    {/* <Twemoji emoji="🌹" /> */}
                </Symbol>

                <Symbol x={0} y={1.2}>
                    <Group gap={2}>
                        <Text fz="md">π</Text>
                        <Text fz="lg">∞</Text>
                        <Text fz="sm">&</Text>
                    </Group>
                </Symbol>
                <Symbol x={0} y={0}>
                    <ThetaDeltaSvg height="2.5rem" fill="white" />
                </Symbol>
            </Stack>
        </Stack>
    );
};

export const Symbol = ({
    x,
    y,
    children,
}: {
    x: number;
    y: number;
} & PropsWithChildren) => {
    return (
        <Box pos="absolute" style={{ top: `calc(50% + ${y}rem)`, left: `calc(50% + ${x}rem)` }}>
            <Box style={{ transform: "translate(-50%, -50%)" }}>
                {children}
            </Box>
        </Box>
    );
};
