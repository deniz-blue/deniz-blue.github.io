import { ActionIcon, Button, Stack } from "@mantine/core";
import { Background, useBackgroundStore } from "../../background/PageBackground";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

export const BackgroundSwitcher = () => {
    const List: Background[] = [
        { type: "starfield", data: {} },
        { type: "oneshot", data: { dead: false } },
        { type: "winter", data: {} },
        { type: "sanctuary", data: {} },
    ];

    const update = (delta: number) => {
        let currentIndex = List.findIndex(x => x.type == useBackgroundStore.getState().background.type);
        if (currentIndex == -1) currentIndex = 0;
        const nextIndex = (currentIndex + delta + List.length) % List.length;
        console.log("Switching background to", List[nextIndex]);
        useBackgroundStore.setState({ background: List[nextIndex] });
    };

    return (
        <Stack align="center" w="100%">
            <Button.Group w="100%">
                {[-1, 1].map(delta => (
                    <Button
                        fullWidth
                        key={delta}
                        onClick={() => update(delta)}
                        variant="light"
                        color="violet"
                    >
                        {delta > 0 ? <IconArrowRight /> : <IconArrowLeft />}
                    </Button>
                ))}
            </Button.Group>
        </Stack>
    )
};
