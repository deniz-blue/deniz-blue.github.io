import { Stack, Text } from "@mantine/core";
import { useCounter, useInterval } from "@mantine/hooks";

export const Device = () => {
    const [counter, { increment }] = useCounter();
    useInterval(increment, 500, {
        autoInvoke: true,
    })

    return (
        <Stack align="center" justify="center" h="100vh">
            <Text ta="center" inline span ff="monospace" c="white" style={{ whiteSpace: "pre-line" }}>
                {counter < 20 ? (
                    `CONNECTING${".".repeat((counter % 3) + 1)}`
                ) : (
                    `CONNECTION ERROR
                    
                    DO NOT TRY AGAIN`
                )}
            </Text>
        </Stack>
    )
};
