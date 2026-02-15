import { Anchor, AnchorProps, Box, Group, Stack } from "@mantine/core";
import { Fragment } from "react";

export const CosplayWebring = () => {
    const anchorProps: AnchorProps = {
        c: "black",
        td: "underline",
        ff: "serif",
        // fz: "sm",
        inherit: true,
        style: {
            backgroundImage: "linear-gradient(transparent, #a0c9ff)",
        },
    };

    return (
        <Stack>
            <Box
                id="cosring"
                style={{
                    opacity: 0.8,
                    border: "4px double black",
                    backgroundImage: "url('https://eyeorb.net/webring/konata_t.png'), url('https://eyeorb.net/webring/bg.png')",
                    backgroundPosition: "0% 20%, center",
                    backgroundRepeat: "no-repeat, repeat",
                    backgroundSize: "5rem, cover",
                    imageRendering: "auto",

                    textShadow: "2px 2px 10px rgba(41, 41, 41, 0.4)",
                    WebkitTextStroke: "0.8px black",
                }}
                w={88 * 3 + 4 * 2}
                py={4}
            >
                <Stack align="center" justify="space-between" gap={0}>
                    <Anchor
                        href="https://eyeorb.net/webring/cosplay.html"
                        target="_blank"
                        {...anchorProps}
                        className="soulSelectable"
                        data-soul-anchor="right-center"
                        data-soul-mr={12}
                        data-soul-z={1}
                    >
                        Cosplay Webring
                    </Anchor>
                    <Group wrap="nowrap" gap={4} align="center">
                        {["prev", "rand", "next"].map((action, i, a) => (
                            <Fragment key={action}>
                                <Stack>
                                    <Anchor
                                        href={`https://eyeorb.net/webring/simplering.html?opt=${action}&slug=deniz`}
                                        {...anchorProps}
                                        className="soulSelectable"
                                        data-soul-z={1}
                                        data-soul-anchor="center-bottom"
                                        data-soul-mb={12}
                                    >
                                        {action}
                                    </Anchor>
                                </Stack>

                                {i !== a.length - 1 && " ▫ "}
                            </Fragment>
                        ))}
                    </Group>
                </Stack>
            </Box>
        </Stack>
    )
};
