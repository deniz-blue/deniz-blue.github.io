import { ActionIcon, Button, Stack, Tooltip } from "@mantine/core";
import { Background, useBackgroundStore } from "../../background/PageBackground";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

export const BackgroundSwitcher = () => {
	const List: Background[] = [
		{ type: "starfield", data: {} },
		{ type: "oneshot", data: {} },
		{ type: "winter", data: {} },
		{ type: "sanctuary", data: {} },
		{ type: "refuge", data: {} },
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
					<Tooltip
						key={delta}
						label={delta > 0 ? "Next Background" : "Previous Background"}
						position={delta > 0 ? "right" : "left"}
					>
						<Button
							fullWidth
							onClick={() => update(delta)}
							variant="light"
							color="violet"
							aria-label={delta > 0 ? "Next Background" : "Previous Background"}
						>
							{delta > 0 ? <IconArrowRight aria-hidden="true" /> : <IconArrowLeft aria-hidden="true" />}
						</Button>
					</Tooltip>
				))}
			</Button.Group>
		</Stack>
	)
};
