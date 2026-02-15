import { AspectRatio, Group, Image, Stack, Text, Title } from "@mantine/core";

export const TechnobladeShrine = () => {
    return (
        <Stack>
            <Stack align="center">
                <AspectRatio ratio={1998 / 3066} w="100%">
                    <Stack
                        w="100%"
                        style={{
                            backgroundImage: "linear-gradient(#000000dd 1%, #00000033 40%, #000000aa, #000000dd), url(/assets/img/techno/statue.png)",
                            backgroundSize: "cover",
                        }}
                        pos="relative"
                    >
                        <Stack gap={0} pos="absolute" pt="xs" style={{ top: "0%" }} align="center" w="100%">
                            <Text inline>🐷👑</Text>
                            <Group justify="center" ta="center">
                                <Title>Technoblade</Title>
                            </Group>
                            <Text>
                                1999 - 2022
                            </Text>
                        </Stack>
                        <Stack
                            pos="absolute"
                            style={{ top: "50%" }}
                            px="xl"
                        >
                            <Text
                                span
                                ta="center"
                                fz="sm"
                            >
                                "No matter how ridiculous the odds may seem, within us resides the power to overcome these challenges and achieve something beautiful that, one day, we'll look back at where we started and be amazed at how far we've come."
                            </Text>
                        </Stack>
                    </Stack>
                </AspectRatio>

                {/* <Image
                    src=""
                    mah="20rem"
                    w="auto"
                /> */}




            </Stack>
        </Stack>
    );
};
