import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Path } from "../util/Path";
import { BaseFNode, createDirectoryNode, createFileNode, DirectoryNode, FNode, FNodeType } from "../util/fnode";

export interface FileSystemState {
	root: DirectoryNode;
}

export interface FileSystemActions {
	node: (path: Path) => FNode | null;
	exists: (path: Path) => boolean;
	read: (path: Path) => string;
	write: (path: Path, content: string, opts?: BaseFNode) => void;
	list: (path: Path) => string[];
	mkdir: (path: Path) => void;
}

export const getNode = (root: DirectoryNode, path: Path, mkdir?: boolean): FNode | null => {
	let node: FNode = root;
	for (const segment of path.absolute().segments()) {
		if (node.type !== FNodeType.DIRECTORY) return null;
		if (!(segment in node.children)) {
			if (mkdir) {
				node.children[segment] = createDirectoryNode();
			} else {
				return null;
			};
		};
		node = node.children[segment];
	}
	return node;
};

export const useFileSystemStore = create<FileSystemState & FileSystemActions>()(
	immer((set, get) => ({
		root: createDirectoryNode(),

		node: (path: Path) => {
			return getNode(get().root, path);
		},

		exists: (path: Path) => !!get().node(path),

		read: (path: Path) => {
			const node = get().node(path);
			if (!node || node.type !== FNodeType.FILE) throw new Error(`File not found: ${path}`);
			return node.content;
		},

		write: (path: Path, content: string) => {
			set((state) => {
				let folder = getNode(state.root, path.parent(), true);
				if (!folder || folder.type !== FNodeType.DIRECTORY) throw new Error(`Not a directory: ${path.parent()}`);
				const filename = path.lastSegment();
				if(folder.children[filename] && folder.children[filename].type === FNodeType.FILE) {
					folder.children[filename].content = content;
				} else {
					folder.children[filename] = createFileNode(content);
				};
			});
		},

		list: (path: Path) => {
			const node = get().node(path);
			if (!node || node.type !== FNodeType.DIRECTORY) throw new Error(`Directory not found: ${path.path}`);
			return Object.keys(node.children);
		},

		mkdir: (path: Path) => {
			set((state) => {
				getNode(state.root, path, true);
			});
		},
	})),
);




