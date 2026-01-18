import { ExecutionContext } from "./ctx";

export enum FNodeType {
	FILE = "file",
	DIRECTORY = "directory",
	EXECUTABLE = "executable",
};

export interface Permissions {
	r: boolean;
	w: boolean;
	x: boolean;
};

export interface BaseFNode {
	hidden?: boolean;
	permissions?: Record<string, Permissions>;
}

export interface FileNode extends BaseFNode {
	type: FNodeType.FILE;
	content: string;
};

export const createFileNode = (content: FileNode["content"], extra?: BaseFNode): FileNode => ({
	type: FNodeType.FILE,
	content,
	...extra,
});

export interface DirectoryNode extends BaseFNode {
	type: FNodeType.DIRECTORY;
	children: Record<string, FNode>;
};

export const createDirectoryNode = (children: DirectoryNode["children"] = {}, extra?: BaseFNode): DirectoryNode => ({
	type: FNodeType.DIRECTORY,
	children,
	...extra,
});

export interface ExecutableNode extends BaseFNode {
	type: FNodeType.EXECUTABLE;
	execute: (ctx: ExecutionContext) => Promise<any> | any;
};

export const createExecutableNode = (execute: ExecutableNode["execute"], extra?: BaseFNode): ExecutableNode => ({
	type: FNodeType.EXECUTABLE,
	execute,
	...extra,
});

export type FNode = FileNode | DirectoryNode | ExecutableNode;
