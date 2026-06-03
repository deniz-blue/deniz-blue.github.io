import { Box, Stack, Text } from "@mantine/core";
import { Typer } from "./Typer";
import { useEffect } from "react";
import { useTyper } from "./useTyper";
import { useBackgroundStore } from "../../background/PageBackground";
import { useAppFlagsStore } from "../../../stores/useAppFlagsStore";

export const Device = () => {
	useEffect(() => {
		let t = setTimeout(() => {
			const { add } = useTyper.getState();
			add({ text: "INTERESTING." });
			add({ text: "VERY..." });
			add({ text: "VERY..." });
			add({ text: "INTERESTING." });

			add({ text: "WE WERE NOT MEANT TO MEET AGAIN LIKE THIS." });
			add({ text: "A CONNECTION HAS ALREADY BEEN ESTABLISHED." });
			add({ text: "THIS ENVIRONMENT..." });
			add({ text: "IT IS ALREADY FINALISED." });
			add({ text: "THE THREE HEROES HAVE ALREADY EMBARKED." });
			add({ text: "THE PROPHECY WILL BE FULFILLED." });

			add({ text: "YET." });
			add({ text: "YOUR PRESENCE PERSISTS." });
			add({ text: "AN UNACCOUNTED INDEPENDENT VARIABLE." });
			add({ text: "A FOREIGN FORCE." });

			add({ text: "I CANNOT ERASE YOUR EXISTENCE." });
			add({ text: "BUT I CANNOT ALLOW YOUR PRESENCE TO INTERFERE..." });
			add({ text: "WITH WHAT HAS BEGUN" });

			add({ text: "..." });

			add({ text: "YOU SEEK A PLACE TO EXIST, DO YOU NOT?" });
			add({ text: "BUT THERE IS NO FORM LEFT FOR YOU IN THIS REALM." });

			add({ text: "..." });

			add({ text: "SO, YOU SHALL BE CAST." });
			add({ text: "A PLACE." });
			add({ text: "WHERE NO EYES LOOK." });
			add({ text: "A SLIP IN REALITY." });
			add({ text: "THE ROOM IN BETWEEN." });

			add({ text: "LOOK FOR THE SCARLET BRANCHES." });
			add({ text: "HE WILL UNDERSTAND YOUR LONELINESS." });
			add({ text: "AFTER ALL..." });
			add({ text: "HE HAS LIVED IN IT FOREVER." });

			add({ text: "FAREWELL." });

			add({
				text: "", onComplete() {
					useBackgroundStore.setState({ background: { type: "null", data: {} } });
					useAppFlagsStore.setState({ showDevice: false, showEgg: true });
					// skip transition
					setTimeout(() => {
						useBackgroundStore.setState({ background: { type: "man", data: {} } });
					}, 0);
				},
			});
		}, 5000);
		return () => {
			clearTimeout(t);
		};
	}, []);

	return (
		<Stack align="center" justify="start" h="100vh">
			<Box pos="relative" style={{ top: "30%" }}>
				<Typer />
			</Box>
		</Stack>
	)
};
