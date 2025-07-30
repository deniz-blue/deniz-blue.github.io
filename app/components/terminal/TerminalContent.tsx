import { Box } from "@mantine/core";
import { Span } from "./api";
import { useEffect, useRef } from "react";

const colors: Partial<Record<string, string>> = {
    "Black": "#000000",
    "Blue": "#2472c8",
    "BrightBlack": "#666666",
    "BrightBlue": "#3b8eea",
    "BrightCyan": "#29b8db",
    "BrightGreen": "#23d18b",
    "BrightMagenta": "#d670d6",
    "BrightRed": "#f14c4c",
    "BrightWhite": "#e5e5e5",
    "BrightYellow": "#f5f543",
    "Cyan": "#11a8cd",
    "Green": "#0dbc79",
    "Magenta": "#bc3fbc",
    "Red": "#cd3131",
    "White": "#e5e5e5",
    "Yellow": "#e5e510",

    "selection": "#264f78",
};

const c = (x?: string) => x ? (colors[x] ?? x) : x;

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
                const style = {
                    color: c(span.fg),
                    backgroundColor: c(span.bg),
                    fontWeight: span.b ? "bold" : "normal",
                };

                let onClick;
                if(span.filepath) onClick = () => onClickSpan?.(span);

                return onClick ? (
                    <a onClick={onClick} style={style} key={i}>
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
