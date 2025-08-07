import { FSNode } from "./fs";
import roomba_log from "./source/roomba.log?raw";

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
            bin("DEVICE", (ctx) => {
                ctx.stdout({ text: " CONNECTING...", b: true, fg: "BrightBlack" });
                ctx.app.setBackground({ type: "depth" });
                ctx.app.setFlags({
                    showTerminal: false,
                    showDevice: true,
                });
            }),
            file("NOTE.txt", "this section is still a WIP"),
            dir("archive", [
                file("girl", "mrrp :3"),
                dir("roomba", [
                    file("2038-08-17-1.log", roomba_log),
                ]),
            ]),
            bin("website", (ctx) => {
                ctx.stdout({ text: "Farewell", fg: "BrightMagenta" });
                ctx.app.setBackground({ type: "starfield" });
                ctx.app.setFlags({
                    showTerminal: false,
                    showPamphlet: true,
                });
            }),
        ]),
    ]),

    dir("bin", Object.entries(programModules).map(([path, mod]) => {
        let name = path.replace(programModulesStripPrefix, "").split(".")[0];
        return bin(name, (mod as any).default as FSNode["execute"]);
    })),
]);

