import { Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { SoulSelectable } from "../../../contexts/soul/SoulSelectable";

export const Device = () => {
    return (
        <Stack m="xl" align="center">
            <Stack gap="xl">
                {[
                    "DARK",
                    "DARKER",
                    "YET DARKER",
                    "SOUL",
                    "SUN",
                    "STRAWBERRY",
                ].map((word, i) => (
                    <SoulSelectable
                        key={i}
                    >
                        <Paper style={{ cursor: "pointer" }}>
                            <Text ta="center" inline span ff="monospace" c="white">
                                {word}
                            </Text>
                        </Paper>
                    </SoulSelectable>
                ))}
            </Stack>
        </Stack>
    )
};
