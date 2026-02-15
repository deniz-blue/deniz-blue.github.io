import { useTerminalStore } from "../../store/useTerminalStore";
import { TERMINAL_COLORS } from "../../TerminalContent";
import { ExecutionContext } from "../../util/ctx";
import { Span } from "../../util/span";
import { os } from "./banner";
import { version } from "react";

const ASCII_ART = `
.....
..TS.
`.trim();

export default function neofetch(ctx: ExecutionContext) {
	const term = useTerminalStore.getState();

	const props = {
		OS: `${os.name} v${os.version}`,
		Host: "deniz.blue",
		Kernel: `${os.name.toLowerCase().replace(" ", "-")}-${os.version}`,
		Uptime: `${Math.floor(performance.now() / 1000 / 60)} mins`,
		Packages: "2763 (bfdi)",
		Shell: `react ${version}`,
		Resolution: `${window.innerWidth}x${window.innerHeight}`,
	};

	const header = [
		{ text: term.username, fg: "Cyan", b: true },
		{ text: "@" },
		{ text: term.hostname, fg: "Cyan", b: true },
	];

	const colors = Object.keys(TERMINAL_COLORS)
		.map((color): Span => ({ text: "   ", bg: color }));

	const rightSide = [
		header,
		[
			{ text: "-".repeat(header.reduce((sum, span) => sum + span.text.length, 0)), fg: "BrightBlack" },
		],
		...Object.entries(props)
			.map(([key, value]): Span[] => [
				{ text: key, fg: "Blue", b: true },
				{ text: ": " },
				{ text: value },
			]),
		[],
		colors.slice(0, 8),
		colors.slice(8, 16),
	];

	const leftSide = [
		[],
		...ASCII_ART.split("\n")
			.map((line): Span[] => [{ text: line.replace(/\./g, " "), fg: "Black", bg: "Blue" }]),
	];

	const maxAsciiWidth = Math.max(...leftSide.map(line => line.reduce((sum, span) => sum + span.text.length, 0)));
	const gap = 2;
	for (let i = 0; i < Math.max(leftSide.length, rightSide.length); i++) {
		const asciiLine = leftSide[i] || [{ text: "" }];
		const propLine = rightSide[i] || [{ text: "" }];

		const asciiLength = asciiLine.reduce((sum, span) => sum + span.text.length, 0);
		const padding: Span = { text: " ".repeat(maxAsciiWidth - asciiLength + gap) };

		term.print([...asciiLine, padding, ...propLine, { text: "\n" }]);
	}
}
