import { Path } from "../util/Path";

export type AnsiColor = "Black" | "Blue" | "BrightBlack" | "BrightBlue"
	| "BrightCyan" | "BrightGreen" | "BrightMagenta"
	| "BrightRed" | "BrightWhite" | "BrightYellow"
	| "Cyan" | "Green" | "Magenta" |
	"Red" | "White" | "Yellow";

export type Span = {
	text: string;
	bg?: AnsiColor | (string & {});
	fg?: AnsiColor | (string & {});
	b?: boolean;
	path?: Path;
};
