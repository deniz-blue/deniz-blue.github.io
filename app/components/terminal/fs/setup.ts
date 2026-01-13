import { useAppFlagsStore } from "../../../stores/useAppFlagsStore";
import { useBackgroundStore } from "../../background/PageBackground";
import { useFileSystemStore } from "../store/useFileSystemStore";
import { useTerminalStore } from "../store/useTerminalStore";
import { createDirectoryNode, createExecutableNode, createFileNode } from "../util/fnode";
import roomba_log from "./source/roomba.log?raw";
import goddrinksjava from "./source/goddrinksjava.java?raw";

const programModules = import.meta.glob("./programs/*.ts", { eager: true });
const programModulesStripPrefix = "./programs/";

export const setupReadOnlyFileSystem = () => {
	useFileSystemStore.setState({
		root: createDirectoryNode({
			home: createDirectoryNode({
				user: createDirectoryNode({
					DEVICE: createExecutableNode((ctx) => {
						useTerminalStore.getState().print({ text: " CONNECTING...", b: true, fg: "BrightBlack" });
						useBackgroundStore.getState().setBackground({ type: "depth", data: {} });
						useAppFlagsStore.setState({
							showTerminal: false,
							showDevice: true,
						});
					}),
					"NOTE.txt": createFileNode("this section is still a WIP"),
					archive: createDirectoryNode({
						girl: createFileNode("mrrp :3"),
						roomba: createDirectoryNode({
							"2038-08-17-1.log": createFileNode(roomba_log),
						}),
						"goddrinksjava.java": createFileNode(goddrinksjava),
						"2026": createExecutableNode((ctx) => {
							useBackgroundStore.getState().setBackground({ type: "oneshot", data: {} });
							useAppFlagsStore.setState({
								showTerminal: false,
								showCountdown: true,
							});
						}),
					}),
					website: createExecutableNode((ctx) => {
						useAppFlagsStore.setState({
							showTerminal: false,
							showPamphletV2: true,
						});
					}),
				}),
			}),
			bin: createDirectoryNode(Object.fromEntries(Object.entries(programModules).map(([path, mod]) => {
				let name = path.replace(programModulesStripPrefix, "").split(".")[0];
				return [name, createExecutableNode((mod as any).default, { hidden: name === "_" })];
			}))),
		}),
	});
};
