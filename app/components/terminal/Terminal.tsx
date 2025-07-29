import { Box } from "@mantine/core";
import { TerminalInput } from "./TerminalInput";
import { TerminalContent } from "./TerminalContent";
import "./terminal-style.css";
import { useRef, useState } from "react";
import { intoSpan, ShellContext, Span } from "./api";
import { ProgramsRegistry } from "./programs";
import { FSHandler } from "./fs";
import { FSROOT } from "./fs/fsroot";
import { useAppContext } from "../../contexts/app/AppContext";
import { useBackgroundContext } from "../../contexts/background/BackgroundContext";
import { useTerminalInputState } from "./useTerminalInputState";
import { useScrollBottom } from "../../hooks/useScrollBottom";

export const Terminal = () => {
    const [_, setAppFlags] = useAppContext();
    const [__, setBg] = useBackgroundContext();
    const specialFiles: Partial<Record<string, () => void>> = {
        "/home/user/DEVICE.bin": () => {
            setBg({ type: "depth" });
            setAppFlags({
                showTerminal: false,
                showDevice: true,
            });
        },
    };

    const username = useRef("user");
    const cwd = useRef("/home/user");

    const fs = new FSHandler(FSROOT);

    const resolveRelative = (p: string) => {
        if(p.startsWith("/")) return fs.resolve(p);
        return fs.resolve(cwd.current + "/" + p);
    };

    const shellPrecursor: () => Span[] = () => [
        { text: `${username.current}@lab02`, fg: "Green", b: true },
        { text: ":", b: true },
        { text: cwd.current, fg: "Blue", b: true },
        { text: "$ ", b: true },
    ];

    const [buffer, setBuffer] = useState<Span[]>([...shellPrecursor()]);
    const ref = useScrollBottom([buffer]);

    const stdout: ShellContext["stdout"] = (spannable) => {
        let arr = Array.isArray(spannable) ? spannable : [spannable];
        setBuffer((old) => [...old, ...arr.map(intoSpan)]);
    };

    const runProgram = async (
        name: string,
        args: string[],
    ) => {
        const program = ProgramsRegistry[name];
        if (program) {
            try {
                await program({
                    cwd: cwd.current,
                    fs,
                    args,
                    username: username.current,
                    cd: (p: string) => cwd.current = p,
                    setUsername: (u: string) => username.current = u,
                    stdout,
                    stdin: "",
                });
            } catch (e) {
                stdout({
                    text: "" + (e as Error).message,
                    fg: "BrightRed",
                });
            }
        } else {
            stdout(`shell: ${name} not found`)
        }
    };

    const onSubmit = async (input: string) => {
        stdout(input);
        stdout("\n");

        if (input && (input.startsWith("./") || input.startsWith("/"))) {
            const path = resolveRelative(input);
            stdout(path + "\n")
            if (specialFiles[path]) {
                specialFiles[path]();
            } else {
                let node = fs.getNode(path);
                if (node) {
                    stdout(`shell: ${input}: ${node.type == "file" ? "Permission denied" : "Is a directory"}`);
                } else {
                    stdout(`shell: ${input}: No such file or directory`);
                }
            }

            stdout("\n");
        } else if (input) {
            const [name, ...args] = input.split(" ");
            await runProgram(name, args);
            stdout("\n");
        }

        stdout(shellPrecursor());
    };

    const inputState = useTerminalInputState({
        onSubmit,
    })

    return (
        <Box
            className="fullscreen terminal"
            style={{
                lineHeight: 1,
                display: "inline-block",
            }}
            ref={ref as any}
        >
            <TerminalContent
                buffer={buffer}
                onClick={(span) => {
                    if(span.filepath) {
                        let node = fs.getNode(span.filepath);
                        if(!node) return;
                        inputState.setValue(`${node.type == "dir" ? "cd" : (
                            node.name.endsWith(".bin") ? "" : "cat"
                        )} ${span.filepath}`.trim());
                    }
                }}
            />
            <TerminalInput {...inputState} />
        </Box>
    )
};
