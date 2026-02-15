import { Stack } from "@mantine/core";
import { Typer } from "../../ui/Typer";

export const WingDing = () => {
    return (
        <Stack h="100dvh" align="center" justify="center">
            <Typer
                nodes={[
                    { text: "My brother has a " },
                    { text: "very special attack", color: "blue" },
                ]}
            />
        </Stack>
    )
};
