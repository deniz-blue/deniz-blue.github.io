import { Box, Paper, Stack } from "@mantine/core";
import { PamphletHeader } from "./PamphletHeader";
import "./pamphlet.css";

export const Pamphlet = ({
    layout,
}: {
    layout?: boolean;
}) => {
    return (
        <Stack align="center" w="100%">
            <Stack gap={0} className="pamphlet">
                <Stack justify="end" h="100dvh" align="stretch">
                    <Paper
                        withBorder
                        style={{
                            borderBottom: "unset",
                            borderRadius: "16px 16px 0 0",
                        }}
                        className="frost"
                    >
                        <PamphletHeader />
                    </Paper>
                </Stack>
                <Paper
                    withBorder
                    style={{
                        borderTop: "unset",
                        borderRadius: "0 0 16px 16px",
                    }}
                    className="frost"
                    w="100%"
                >
                    {/* <PamphletContent /> */}
                </Paper>
            </Stack>

            {layout && <Box h="50vh" />}
        </Stack>
    );
};
