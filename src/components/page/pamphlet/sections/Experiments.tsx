import { Button, Divider, SimpleGrid, Stack } from "@mantine/core";
import { useReward } from "react-rewards";

export const Experiments = () => {
    const { reward: left } = useReward("rr1", "emoji", {
        emoji: ["⭐"],
        angle: 60,
    });
    const { reward: right } = useReward("rr2", "emoji", {
        emoji: ["⭐"],
        angle: 120,
    });

    return (
        <Stack w="100%" align="center">
            <Divider
                w="80%"
                label="Experiments"
            />

            <SimpleGrid cols={3}>
                <Button
                    variant="light"
                    onClick={() => { left(); right() }}
                >
                    Shoot!
                </Button>
            </SimpleGrid>
        </Stack>
    )
};
