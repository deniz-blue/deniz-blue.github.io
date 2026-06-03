import { Box, Stack, Text } from "@mantine/core";
import { Typer } from "./Typer";

export const EggRoom = () => {
	return (
		<Stack align="center" justify="start" h="100dvh">
			<Box pos="relative" style={{ top: "70%" }}>
				<Text ff="monospace" c="white" ta="center" fz="sm">
					(There is not a man behind the tree.)
				</Text>
			</Box>
		</Stack>
	)
};
