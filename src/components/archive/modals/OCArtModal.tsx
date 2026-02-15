import { Arts } from "@/Arts";
import { Anchor, Box, Flex, Grid, Group, Image, SimpleGrid, Stack, Text } from "@mantine/core";
import { Localized } from "@alan404/react-localization";

export const OCArtModal = () => {
    return (
        <Stack w="100%">
            <Box style={{ columnCount: 2, columnGap: 0 }}>
                {Arts.map((art, i) => (
                    <Box key={i} display="inline-block" style={{ lineHeight: 1 }}>
                        <Stack mb={2} p={2} gap={2} align="center" bg="dark">
                            <Image
                                src={art.src}
                                fit="contain"
                            />

                            <Group justify="center" ta="center" gap={4}>
                                {/* <Localized
                                    en="drawn by #AUTHOR#"
                                    tr="çizer: #AUTHOR#"
                                    AUTHOR={( */}
                                        <Anchor
                                            href={art.author.link}
                                            target="_blank"
                                            inline
                                        >
                                            {art.author.name}
                                        </Anchor>
                                    {/* )}
                                /> */}
                            </Group>
                        </Stack>
                    </Box>
                ))}
            </Box>
        </Stack>
    );
};
