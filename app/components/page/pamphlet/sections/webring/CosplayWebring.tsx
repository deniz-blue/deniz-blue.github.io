import { Anchor, AnchorProps, Box, Group, Stack } from "@mantine/core";

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
                    border: "4px double black",
                    backgroundImage: "url('https://eyeorb.net/webring/konata_t.png'), url('https://eyeorb.net/webring/bg.png')",
                    backgroundPosition: "0% 20%, center",
                    backgroundRepeat: "no-repeat, repeat",
                    backgroundSize: "5rem, cover",
                    imageRendering: "auto",

                    textShadow: "2px 2px 10px rgba(41, 41, 41, 0.4)",
                    WebkitTextStroke: "0.8px black",
                }}
                p={5}
            >
                <Stack align="center" justify="space-between" gap={0} my="xs">
                    <Anchor
                        href="https://eyeorb.net/webring/cosplay.html"
                        target="_blank"
                        {...anchorProps}
                        mx={"3rem"}
                    >
                        Cosplay Webring
                    </Anchor>
                    <Group wrap="nowrap" gap={4} align="center">
                        <Anchor
                            href="https://eyeorb.net/webring/simplering.html?opt=prev&slug=deniz"
                            {...anchorProps}
                        >
                            prev
                        </Anchor>
                        {" ▫ "}
                        <Anchor
                            href="https://eyeorb.net/webring/simplering.html?opt=rand&slug=deniz"
                            {...anchorProps}
                        >
                            rand
                        </Anchor>
                        {" ▫ "}
                        <Anchor
                            href="https://eyeorb.net/webring/simplering.html?opt=next&slug=deniz"
                            {...anchorProps}
                        >
                            next
                        </Anchor>
                    </Group>
                </Stack>
            </Box>
        </Stack>
    )
};
