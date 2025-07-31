import { Box } from "@mantine/core";
import { TerminalInput } from "./TerminalInput";
import { TerminalContent } from "./TerminalContent";
import { useEffect, useRef, useState } from "react";
import { intoSpan, ShellContext, Span } from "./api";
import { FSHandler, FSNode } from "./fs/fs";
import { FSROOT } from "./fs/fsroot";
import { useAppContext } from "../../contexts/app/AppContext";
import { useBackgroundContext } from "../../contexts/background/BackgroundContext";
import { useTerminalInputState } from "./useTerminalInputState";
import { useScrollBottom } from "../../hooks/useScrollBottom";
import "./terminal-style.css";

export const Terminal = () => {
    const [_, setFlags] = useAppContext();
    const [__, setBackground] = useBackgroundContext();
    const app = {
        setFlags,
        setBackground,
    };

    const username = useRef("user");
    const cwd = useRef("/home/user");

    const fs = new FSHandler(FSROOT);

    const tryTilde = (absPath: string) => {
        let prefix = `/home/${username.current}`;
        if (absPath.startsWith(prefix)) {
            return absPath.replace(prefix, "~");
        } else {
            return absPath;
        }
    };

    const shellPrecursor: () => Span[] = () => [
        { text: `${username.current}@lab02`, fg: "Green", b: true },
        { text: ":", b: true },
        { text: tryTilde(cwd.current), fg: "Blue", b: true, filepath: cwd.current },
        { text: "$ ", b: true },
    ];

    const [buffer, setBuffer] = useState<Span[]>([
        { text: "SHARK OS v0.02\n", fg: "Cyan", b: true },
        { text: "Type '", fg: "BrightBlack" },
        { text: "help", fg: "BrightBlack", filepath: "/bin/help", b: true },
        { text: "' for a list of commands\n", fg: "BrightBlack" },
        {
            text: `Last login: ${new Date().toLocaleString("en", {
                dateStyle: "long",
            })} from 127.0.0.1\n`, fg: "BrightBlack"
        },
        // { text: "\n" },
        ...shellPrecursor()
    ]);

    const stdout: ShellContext["stdout"] = (spannable) => {
        let arr = Array.isArray(spannable) ? spannable : [spannable];
        setBuffer((old) => [...old, ...arr.map(intoSpan)]);
    };

    const tryExecuteFile = async (node: FSNode, args: string[]) => {
        if (!node.execute) return stdout({
            text: `shell: ${node.name}: ${node.type == "file" ? "Permission denied" : "Is a directory"}`,
        });

        try {
            await node.execute({
                cwd: cwd.current,
                cd: (p: string) => cwd.current = p,
                username: username.current,
                setUsername: (u: string) => username.current = u,
                args,
                stdout,
                stdin: "",
                fs,
                app,
                relPathToAbsPath: relPathToAbsPath,
            });
        } catch (e) {
            stdout({
                text: "" + (e as Error).message,
                fg: "BrightRed",
            });
        }
    };

    const $PATH = ["/bin"];
    const relPathToAbsPath = (input?: string): string | null => {
        if (!input) return null;
        // shitty homedir handling !!
        if (input == "~") input = `/home/${username.current}`;
        if (input.startsWith("~/")) input = `/home/${username.current}/${input.slice(2)}`;
        if (input.startsWith("/")) return fs.exists(input) ? "/" + fs.normalize(input).join("/") : null;
        return [
            cwd.current + "/" + input,
            ...$PATH.map(x => x + "/" + input),
        ].map(x => "/" + fs.normalize(x).join("/")).find(x => fs.exists(x)) ?? null;
    };

    const absToRel = (targetPath: string): string => {
        const from = cwd.current.split("/").filter(Boolean);
        const to = targetPath.split("/").filter(Boolean);

        let i = 0;
        while (i < from.length && i < to.length && from[i] === to[i]) i++;

        const upMoves = from.length - i;
        const downMoves = to.slice(i);

        let ret = [
            ...Array(upMoves).fill(".."),
            ...downMoves,
        ].join("/");
        if (!ret) return ".";
        if (!ret.startsWith("..")) return "./" + ret;
        return ret;
    }

    const tryRunInput = (input: string) => {
        const [file, ...args] = input.split(" ");
        let path = relPathToAbsPath(file);
        if (!path) return stdout(`shell: ${input}: No such file or directory`);
        tryExecuteFile(fs.getNode(path)!, args);
    };

    const onSubmit = async (input: string) => {
        stdout(input);
        stdout("\n");

        if (input) {
            tryRunInput(input);
            stdout("\n");
        }

        stdout(shellPrecursor());
    };

    const inputState = useTerminalInputState({
        onSubmit,
    })

    useEffect(() => {
        onSubmit("ls");
    }, []);

    useEffect(() => {
        window.scrollTo({ top: document.body.scrollHeight });
    }, [buffer, inputState.value]);

    return (
        <Box
            className="terminal"
            style={{
                lineHeight: 1,
                display: "inline-block",
                padding: "8px",
                height: "100%",
                width: "100%",
            }}
            // ref={ref as any}
        >
            <TerminalContent
                buffer={buffer}
                onClick={(span) => {
                    if (span.filepath) {
                        let node = fs.getNode(span.filepath);
                        if (!node) return;

                        let program = "";
                        if(node.type == "dir") program = "cd";
                        if(!program && !node.execute) program = "cat";

                        let path = span.filepath!;
                        if(path.startsWith("/bin/")) path = path.replace("/bin/", "");
                        if(path[0] == "/") path = absToRel(path);

                        const newCommand = `${program}${program ? " " : ""}${path}`.trim();

                        if(inputState.value == newCommand) {
                            onSubmit(newCommand);
                            inputState.setValue("");
                        } else {
                            inputState.setValue(newCommand);
                        }
                    }
                }}
            />
            <TerminalInput {...inputState} />
        </Box>
    )
};
