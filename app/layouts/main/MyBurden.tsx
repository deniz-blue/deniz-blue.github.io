import { ActionIcon, Affix, Box, Button, Image, Paper, Stack, Text, Transition } from "@mantine/core";
import { useFeatures } from "../../components/base/FeaturesContext";
import { useDocumentTitle, useHotkeys, useWindowEvent } from "@mantine/hooks";
import { useCallback, useEffect, useRef, useState } from "react";

export const MyBurden = () => {
    const { disable, myBurdenIsDead, enable, toggle } = useFeatures();

    useDocumentTitle(myBurdenIsDead ? "[You killed Niko]" : "deniz.blue 💡");

    useHotkeys([["r", () => disable("myBurdenIsDead")]])

    return (
        <Box>
            <Stack w="100%" align="center" justify="center" h="100dvh" gap={4}>
                <Paper
                    className="frost"
                    p={4}
                >
                    <Text fz="xs" c={myBurdenIsDead ? "dimmed" : "white"}>
                        My Burden is {myBurdenIsDead ? "Dead" : "Light"}
                    </Text>
                </Paper>

                <Transition
                    mounted={myBurdenIsDead}
                    keepMounted
                >
                    {(styles) => (
                        <Image
                            style={{
                                userSelect: "none",
                                ...styles,
                            }}
                            draggable={false}
                            src="/assets/img/detail/oneshot/SunBroken.png"
                            title="[You broke it.]"
                            w={32}
                            h={32}
                        />
                    )}
                </Transition>

                {!myBurdenIsDead && (
                    <ActionIcon
                        variant="subtle"
                        color="black"
                        onClick={() => toggle("myBurdenIsDead")}
                        size={32}
                    >
                        <Image
                            src="/assets/img/detail/oneshot/item_start_lightbulb.png"
                            title="[Be careful.]"
                            w={32}
                            h={32}
                        />
                    </ActionIcon>
                )}
            </Stack>
        </Box >
    );
};
