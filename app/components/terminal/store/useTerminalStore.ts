import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Path, SEPERATOR } from "../util/Path";
import { Span } from "../util/span";
import { ExecutableNode, FNodeType } from "../util/fnode";
import { useFileSystemStore } from "./useFileSystemStore";
import { setupReadOnlyFileSystem } from "../fs/setup";

export interface TerminalState {
	username: string;
	hostname: string;
	cwd: Path;
	env: Record<string, string>;
	buffer: Span[];
}

export interface TerminalActions {
	printShellPrompt: () => void;
	print: (content: Span | Span[] | string) => void;
	clear: () => void;
	run: (input: string) => Promise<void>;
}

export const useTerminalStore = create<TerminalState & TerminalActions>()(
	immer((set, get) => ({
		username: "user",
		hostname: "lab02",
		cwd: new Path("/home/user"),
		buffer: [],
		env: {
			PATH: "/bin:/usr/bin:/usr/local/bin",
		},

		print: (content: Span | Span[] | string) => {
			set((state) => {
				if (typeof content === "string") {
					state.buffer.push({ text: content });
				} else {
					state.buffer.push(...(Array.isArray(content) ? content : [content]));
				}
			});
		},

		printShellPrompt: () => {
			const state = get();
			get().print([
				{ text: `${state.username}@${state.hostname}`, fg: "Green", b: true },
				{ text: ":", b: true },
				{ text: state.cwd.shorten().path, fg: "Blue", b: true, path: state.cwd },
				{ text: "$ ", b: true },
			]);
		},

		clear: () => {
			set((state) => {
				state.buffer = [];
			});
		},

		run: async (input: string) => {
			const [file, ...args] = input.split(" ");
			const [fullpath, node] = findExecutable(file) || [null, null];
			const term = get();
			if (!fullpath) {
				term.print(`shell: ${file}: No such file or directory\n`);
				term.printShellPrompt();
				return;
			};
			if (node.type !== FNodeType.EXECUTABLE) {
				term.print(`shell: ${file}: ${node.type == FNodeType.FILE ? "Permission denied" : "Is a directory"}\n`);
				term.printShellPrompt();
				return;
			};

			try {
				await node.execute({
					args,
				});
			} catch (e) {
				useTerminalStore.getState().print({
					text: "" + (e as Error).message,
					fg: "BrightRed",
				});
			}

			term.print("\n");
			term.printShellPrompt();
		},
	})),
);

export const findExecutable = (filename: string): [Path, ExecutableNode] | null => {
	const fs = useFileSystemStore.getState();
	
	// Absolute path
	if (filename.startsWith(SEPERATOR)) {
		const fullPath = new Path(filename).absolute();
		const node = fs.node(fullPath);
		if (node && node.type == FNodeType.EXECUTABLE) {
			return [fullPath, node];
		}
	};

	// Relative to cwd
	{
		const fullPath = Path.cwd().join(filename).absolute();
		const node = fs.node(fullPath);
		if (node && node.type == FNodeType.EXECUTABLE) {
			return [fullPath, node];
		}
	};

	// PATH lookup
	const $PATH = (useTerminalStore.getState().env.PATH || "").split(":");
	for (const folder of $PATH) {
		const fullPath = new Path(folder).join(filename).absolute();
		const node = fs.node(fullPath);
		if (node && node.type == FNodeType.EXECUTABLE) {
			return [fullPath, node];
		}
	}
	return null;
};

setupReadOnlyFileSystem();
useTerminalStore.getState().run("/bin/banner");
