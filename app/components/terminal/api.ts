import { AppFlags } from "../../contexts/app/AppContext";
import { Background } from "../../contexts/background/BackgroundContext";
import { FSHandler } from "./fs/fs";

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
    filepath?: string;
};

export type Spannable = Span | string;
export const intoSpan = (x: Spannable) => typeof x == "string" ? { text: x } : x;

export type ShellContext = {
    username: string;
    setUsername: (v: string) => void;
    cwd: string;
    cd: (p: string) => void;
    fs: FSHandler;
    stdout: (b: Spannable | Spannable[]) => void;
    relPathToAbsPath: (relPath: string) => string | null;
};

export type CommandContext = ShellContext & {
    stdin: string;
    args: string[];
    app: {
        setBackground: (b: Background) => void;
        setFlags: (f: Partial<AppFlags>) => void;
    },
};
