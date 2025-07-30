import { CommandContext } from "../api";

export type FSNode = {
    name: string;
    type: "file" | "dir";
    content?: string;
    children?: FSNode[];
    execute?: (ctx: CommandContext) => Promise<void>;
};

export class FSHandler {
    root: FSNode;

    constructor(root: FSNode) {
        this.root = root;
    }

    normalize(path: string): string[] {
        return path
            .split("/")
            .filter(Boolean)
            .reduce<string[]>((acc, part) => {
                if (part === ".") return acc;
                if (part === "..") acc.pop();
                else acc.push(part);
                return acc;
            }, []);
    }

    resolve(path: string): string {
        return ["", ...this.normalize(path)].join("/");
    }

    getNode(path: string): FSNode | null {
        const parts = this.normalize(path);
        let node: FSNode = this.root;

        for (const part of parts) {
            if (node.type !== "dir" || !node.children) return null;
            const next = node.children.find(c => c.name === part);
            if (!next) return null;
            node = next;
        }

        return node;
    }

    exists(path: string): boolean {
        return this.getNode(path) !== null;
    }

    read(path: string): string {
        const node = this.getNode(path);
        if (!node || node.type !== "file") throw new Error(`File not found: ${path}`);
        return node.content ?? "";
    }

    write(path: string, content: string) {
        const parts = this.normalize(path);
        const filename = parts.pop();
        if (!filename) throw new Error("Invalid path");

        let dir = this.getNode("/" + parts.join("/"));
        if (!dir || dir.type !== "dir") throw new Error("Directory not found");

        const existing = dir.children?.find(c => c.name === filename);
        if (existing && existing.type !== "file")
            throw new Error(`Cannot overwrite directory: ${filename}`);

        if (!dir.children) dir.children = [];

        const newFile: FSNode = { name: filename, type: "file", content };
        if (existing) Object.assign(existing, newFile);
        else dir.children.push(newFile);
    }

    mkdir(path: string) {
        const parts = this.normalize(path);
        const name = parts.pop();
        if (!name) throw new Error("Invalid path");

        const parent = this.getNode("/" + parts.join("/"));
        if (!parent || parent.type !== "dir") throw new Error("Parent directory does not exist");

        if (!parent.children) parent.children = [];

        if (parent.children.find(c => c.name === name))
            throw new Error("Directory or file already exists");

        parent.children.push({ name, type: "dir", children: [] });
    }

    rm(path: string) {
        const parts = this.normalize(path);
        const name = parts.pop();
        if (!name) throw new Error("Invalid path");

        const parent = this.getNode("/" + parts.join("/"));
        if (!parent || parent.type !== "dir" || !parent.children)
            throw new Error("Parent directory not found");

        const index = parent.children.findIndex(c => c.name === name);
        if (index === -1) throw new Error("Target not found");

        parent.children.splice(index, 1);
    }
};

