import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Path } from "../util/Path";
import { createDirectoryNode, DirectoryNode, FNode, FNodeType } from "../util/fnode";

export interface FileSystemState {
	root: DirectoryNode;
}

export interface FileSystemActions {
	node: (path: Path) => FNode | null;
	exists: (path: Path) => boolean;
	read: (path: Path) => string;
	write: (path: Path, content: string) => void;
	list: (path: Path) => string[];
}

export const useFileSystemStore = create<FileSystemState & FileSystemActions>()(
	immer((set, get) => ({
		root: createDirectoryNode(),

		node: (path: Path) => {
			let node: FNode = get().root;
			for (const segment of path.absolute().segments()) {
				if (node.type !== FNodeType.DIRECTORY) return null;
				if (!(segment in node.children)) return null;
				node = node.children[segment];
			}
			return node;
		},

		exists: (path: Path) => !!get().node(path),

		read: (path: Path) => {
			const node = get().node(path);
			if (!node || node.type !== FNodeType.FILE) throw new Error(`File not found: ${path}`);
			return node.content;
		},

		write: (path: Path, content: string) => {
			set((state) => {
				let node: FNode = state.root;
				const segments = path.absolute().segments();
				for (let i = 0; i < segments.length; i++) {
					const segment = segments[i];
					if (node.type !== FNodeType.DIRECTORY) throw new Error(`Not a directory: ${segments.slice(0, i).join("/")}`);
					if (!(segment in node.children)) {
						if (i === segments.length - 1) {
							// Last segment, create file
							node.children[segment] = { type: FNodeType.FILE, content };
						} else {
							// Intermediate directory
							node.children[segment] = createDirectoryNode();
						}
					}
					node = node.children[segment];
				}
			});
		},

		list: (path: Path) => {
			const node = get().node(path);
			if (!node || node.type !== FNodeType.DIRECTORY) throw new Error(`Directory not found: ${path.path}`);
			return Object.keys(node.children);
		},
	})),
);




