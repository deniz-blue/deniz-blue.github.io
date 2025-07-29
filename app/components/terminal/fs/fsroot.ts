import { FSNode } from "../fs";

const file = (name: string, content: string): FSNode => ({
    name,
    type: "file",
    content,
});

const dir = (name: string, children: FSNode[]): FSNode => ({
    name,
    type: "dir",
    children,
});

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
]);

