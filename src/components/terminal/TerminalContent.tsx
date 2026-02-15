import { Box } from "@mantine/core";
import React from "react";
import { Span } from "./util/span";

export const TERMINAL_COLORS: Partial<Record<string, string>> = {
	Black: "#000000",
	Red: "#cd3131",
	Green: "#0dbc79",
	Yellow: "#e5e510",
	Blue: "#2472c8",
	Magenta: "#bc3fbc",
	Cyan: "#11a8cd",
	White: "#e5e5e5",

	BrightBlack: "#666666",
	BrightRed: "#f14c4c",
	BrightGreen: "#23d18b",
	BrightYellow: "#f5f543",
	BrightBlue: "#3b8eea",
	BrightMagenta: "#d670d6",
	BrightCyan: "#29b8db",
	BrightWhite: "#e5e5e5",
};

// "selection": "#264f78",

const c = (x?: string) => x ? (TERMINAL_COLORS[x] ?? x) : x;

export const TerminalContent = ({
	buffer,
	onClick: onClickSpan,
}: {
	buffer: Span[];
	onClick?: (s: Span) => void;
}) => {
	return (
		<Box
			component="pre"
			className="terminal-content"
		>
			{buffer.map((span, i) => {
				const clickable = !!span.path;
				let onClick = (e: React.MouseEvent) => {
					e.preventDefault();
					onClickSpan?.(span);
				};

				const style: React.CSSProperties = {
					color: c(span.fg),
					backgroundColor: c(span.bg),
					fontWeight: span.b ? "bold" : "normal",
					cursor: clickable ? "pointer" : undefined,
				};

				return clickable ? (
					<a
						onClick={onClick}
						style={style}
						key={i}
					>
						{span.text}
					</a>
				) : (
					<span style={style} key={i}>
						{span.text}
					</span>
				)
			})}
		</Box>
	)
};
