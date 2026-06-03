import { Text } from "@mantine/core";
import { useHotkeys, useWindowEvent } from "@mantine/hooks";
import { useTyper } from "./useTyper";

export const Typer = () => {
	const next = useTyper((state) => state.next);
	const skip = useTyper((state) => state.skip);
	const text = useTyper((state) => state.displayedText);

	useHotkeys([
		["z", next],
		["x", skip],
	]);

	useWindowEvent("click", next);

	return (
		<Text
			ff="deltarune"
			fz="h2"
			ta="center"
			inherit
			inline
			style={{
				whiteSpace: "pre-line",
				userSelect: "none",
				textAlignLast: "center",
			}}>
			{text}
		</Text>
	)
};

