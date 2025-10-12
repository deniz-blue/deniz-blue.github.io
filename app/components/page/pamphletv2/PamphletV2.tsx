import { ActionIcon, Box, Button, ButtonProps, Image, PolymorphicComponentProps, Space, Stack, Text } from "@mantine/core";
import { MeName } from "../pamphlet/PamphletHeader";
import { IconBell, IconBrandDiscord, IconBrandGithub, IconCash, IconCurrency, IconCurrencyDollar, IconExternalLink, IconFile, IconPackage, IconTool, IconWorld } from "@tabler/icons-react";
import { CosplayWebring } from "../pamphlet/sections/webring/CosplayWebring";
import { useFeatures } from "../../base/FeaturesContext";
import { useRef } from "react";
import shatter from "../../background/oneshot/shatter.wav";
import { useSoundEffect } from "../../../contexts/audio/useSoundEffect";
import { ProjectListV2 } from "./ProjectListV2";

export const V2Button = ({
    children,
    ...props
}: {

} & PolymorphicComponentProps<"a", ButtonProps>) => {
    const { myBurdenIsDead } = useFeatures();

    return (
        <Button
            size="compact-md"
            justify="space-between"
            fullWidth
            variant="light"
            component="a"
            rightSection={<IconExternalLink size={12} />}
            color={myBurdenIsDead ? "gray" : undefined}
            c={myBurdenIsDead ? "dimmed" : undefined}
            {...props}
        >
            <Text
                inline
                inherit
                span
                ta="start"
                w="100%"
            >
                {children}
            </Text>
        </Button>
    )
};

export const PamphletV2 = () => {
    const { disable, myBurdenIsDead, enable, toggle } = useFeatures();
    const { play: play$shatter } = useSoundEffect(shatter);
    const threshold = 5;
    const interval = 2000;
    const clickCount = useRef(0);
    const timer = useRef<number>(null);
    const reset = () => {
        clickCount.current = 0;
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }
    };
    const onSunClick = () => {
        if (myBurdenIsDead) return;
        clickCount.current++;
        if (clickCount.current >= threshold) {
            reset();
            enable("myBurdenIsDead");
            play$shatter();
            return;
        };
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(reset, interval);
    };

    return (
        <Stack
            mih="100dvh"
            // justify="center"
            align="center"
            pt="3rem"
            pb="7rem"
        >
            {/* <OneshotBGM /> */}

            <Stack
                gap={4}
                align="center"
                maw={88 * 3 + 4 * 2}
            >
                <ActionIcon
                    variant="subtle"
                    color="transparent"
                    size="auto"
                    onClick={onSunClick}
                >
                    <Image
                        display={myBurdenIsDead ? "none" : undefined}
                        src={"/assets/img/detail/oneshot/item_start_lightbulb.png"}
                        title={"[Be careful.]"}
                        width={64}
                        height={64}
                        style={{ imageRendering: "pixelated" }}
                    />
                    <Image
                        display={!myBurdenIsDead ? "none" : undefined}
                        src={"/assets/img/detail/oneshot/SunBroken.png"}
                        title={"[You broke it.]"}
                        width={64}
                        height={64}
                        style={{ imageRendering: "pixelated" }}
                    />
                </ActionIcon>

                {!myBurdenIsDead && (
                    <Box fw="bold">
                        <MeName />
                    </Box>
                )}

                {myBurdenIsDead && (
                    <Stack gap={0}>
                        {Array(12).fill(0).map((_, i) => i).reverse().map(i => (
                            <Text
                                c={"#" + i.toString(16).padStart(2, "0").repeat(3)}
                                key={i}
                                inline
                                span
                                fs="italic"
                            >
                                my burden is dead
                            </Text>
                        ))}
                    </Stack>
                )}

                {!myBurdenIsDead && (
                    <Stack>
                        <Stack gap={4} align="center">
                            <Text inline fw="bold" fz="xs">
                                LINKS
                            </Text>
                            <V2Button
                                leftSection={<IconBrandGithub />}
                                href="https://github.com/deniz-blue"
                            >
                                GitHub
                            </V2Button>
                            <V2Button
                                leftSection={<IconBrandDiscord />}
                                href="https://deniz.blue/discord-invite?id=1197520507617153064"
                            >
                                Discord Server
                            </V2Button>
                        </Stack>

                        <ProjectListV2 />

                        <Stack gap={4} align="center">
                            <Text inline fw="bold" fz="xs">
                                WEBRING
                            </Text>
                            <CosplayWebring />
                        </Stack>

                        <Text c="dimmed" ta="center" inline span fz="xs" fs="italic">
                            my burden is light
                        </Text>

                        <Space h="50vh" />
                    </Stack>
                )}
            </Stack>
        </Stack>
    )
};
