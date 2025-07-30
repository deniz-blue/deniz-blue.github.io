import { FSNode } from "./fs";

const file = (name: string, content: string): FSNode => ({
    name,
    type: "file",
    content,
});

const bin = (name: string, execute: FSNode["execute"]): FSNode => ({
    name,
    type: "file",
    execute,
});

const dir = (name: string, children: FSNode[]): FSNode => ({
    name,
    type: "dir",
    children,
});

const programModules = import.meta.glob("./programs/*.ts", { eager: true });
const programModulesStripPrefix = "./programs/";

export const FSROOT: FSNode = dir("/", [
    dir("home", [
        dir("user", [
            file("DEVICE.bin", ""),
            file("NOTE.txt", "this section is still a WIP"),
            dir("stuff", [
                file("girl", "mrrp :3"),
            ]),
        ]),
    ]),

    dir("bin", Object.entries(programModules).map(([path, mod]) => {
        let name = path.replace(programModulesStripPrefix, "").split(".")[0];
        return bin(name, (mod as any).default as FSNode["execute"]);
    })),
]);

