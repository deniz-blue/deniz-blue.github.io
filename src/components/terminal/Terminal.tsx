import { Box } from "@mantine/core";
import { TerminalInput } from "./TerminalInput";
import { TerminalContent } from "./TerminalContent";
import { useEffect } from "react";
import { useAppFlagsStore } from "../../stores/useAppFlagsStore";
import { useTerminalInputState } from "./useTerminalInputState";
import mus_smile from "./mus_smile.ogg";
import "./terminal-style.css";
import { useTerminalStore } from "./store/useTerminalStore";
import { Path } from "./util/Path";
import { DirectoryNode, FNode, FNodeType } from "./util/fnode";
import { useFileSystemStore } from "./store/useFileSystemStore";
import { useSoundEffect } from "../../stores/audio-context";

export const ENTRY_17 = `☜☠❄☼✡ 📂🖮\n👎✌☼😐 👎✌☼😐☜☼ ✡☜❄ 👎✌☼😐☜☼\n❄☟☜ 👎✌☼😐☠☜💧💧 😐☜☜🏱💧 ☝☼⚐🕈✋☠☝\n🏱☟⚐❄⚐☠💧 ☼☜✌👎✋☠☝ ☠☜☝✌❄✋✞☜\n❄☟✋💧 ☠☜✠❄ ☜✠🏱☜☼✋💣☜☠❄\n💧☜☜💣💧\n✞☜☼✡\n✞☜☼✡\n✋☠❄☜☼☜💧❄✋☠☝\n📬📬📬\n🕈☟✌❄ 👎⚐ ✡⚐🕆 ❄🕈⚐ ❄☟✋☠😐`;

export const Terminal = () => {
	const showTerminal = useAppFlagsStore(store => store.showTerminal);

	const buffer = useTerminalStore(store => store.buffer);

	const { play: play$mus_smile } = useSoundEffect(mus_smile);

	const TerminalHistoryKey = "deniz.blue:terminal-history";
	const getHistory = () => JSON.parse(localStorage.getItem(TerminalHistoryKey) || "[]") as string[];
	const updateBashHistory = () =>
		useFileSystemStore
			.getState()
			.write(
				new Path("~/.bash_history"),
				getHistory().join("\n") + "\n",
				{ hidden: true },
			);

	useEffect(() => updateBashHistory(), []);

	const inputState = useTerminalInputState({
		onSubmit: async (input: string) => {
			useTerminalStore.getState().print(input);
			useTerminalStore.getState().print("\n");
			if (input) {
				useTerminalStore.getState().run(input).catch(err => {
					useTerminalStore.getState().print({ text: err.message + "\n", fg: "Red" });
				});
			} else {
				useTerminalStore.getState().printShellPrompt();
			}
		},

		getHistory,
		addToHistory: (str: string) => {
			localStorage.setItem(TerminalHistoryKey, JSON.stringify([...getHistory(), str].filter(Boolean).slice(-100)));
			updateBashHistory();
		},

		onInputValueChange: (s) => {
			if (s.split(" ").join("").toLowerCase() == "gas" + "ter") {
				inputState.setValue("");
				inputState.setDisabled(true);
				useTerminalStore.setState({ buffer: [{ text: ENTRY_17 }] });
				play$mus_smile();
				setTimeout(() => location.reload(), 1000);
			}
		},

		onCompletionRequest({ token, input }) {
			const parts = input.split(/\s+/);

			const fs = useFileSystemStore.getState();
			const $PATH = useTerminalStore.getState().env.PATH
				.split(":")
				.map(p => Path.cwd().join(p).absolute());


			const executables = $PATH.map(folder => fs.node(folder))
				.filter((node): node is DirectoryNode => !!node && node.type == FNodeType.DIRECTORY)
				.map(dirNode => Object.keys(dirNode.children))
				.flat()
				.filter((v, i, a) => a.indexOf(v) === i)
				.filter(x => x !== "_");

			const cwdNode = fs.node(Path.cwd()) as DirectoryNode;
			const cwdExecutables = Object.entries(cwdNode.children)
				.filter(([name, node]) => node.type == FNodeType.EXECUTABLE)
				.map(([name]) => name);

			if (parts.length <= 1) {
				return [
					...executables,
					...cwdExecutables,
				];
			} else {
				if (["cd", "ls", "cat"].includes(parts[0])) {
					const filter: (x: FNode) => boolean = {
						cd: (x: FNode) => x.type == FNodeType.DIRECTORY,
						ls: (x: FNode) => x.type == FNodeType.DIRECTORY,
						cat: (x: FNode) => x.type == FNodeType.FILE,
					}[parts[0]]!
					return Object.entries(cwdNode.children).filter(([name, node]) => filter(node)).map(([name]) => name);
				}
			}

			return [];
		},
	})

	useEffect(() => {
		window.scrollTo({ top: showTerminal ? document.body.scrollHeight : 0 });
	}, [buffer, inputState.value, showTerminal]);

	return (
		<Box
			className="terminal"
			style={{
				lineHeight: 1,
				display: "inline-block",
				padding: "8px",
				width: "100%",
				backgroundColor: "transparent",
			}}
		>
			<TerminalContent
				buffer={buffer}
				onClick={(span) => {
					if (span.path) {
						const fs = useFileSystemStore.getState();
						let node = fs.node(span.path);
						if (!node) return;

						let program = "";
						if (node.type == FNodeType.DIRECTORY) program = "cd";
						if (node.type == FNodeType.FILE) program = "cat";

						let path = "" + span.path!;
						if (path.startsWith("/bin/")) path = path.replace("/bin/", "");
						if (path[0] == "/") path = new Path(path).relativeTo(Path.cwd()).path;

						const newCommand = `${program}${program ? " " : ""}${path}`.trim();

						if (inputState.value == newCommand) {
							inputState.submit(newCommand);
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
