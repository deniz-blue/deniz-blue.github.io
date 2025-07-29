import { Program } from "./api";

export const ProgramsRegistry = Object.fromEntries(Object.entries(import.meta.glob("./programs/*.ts", { eager: true }))
    .map(([path, mod]: [string, any]) => {
        let s = path.split("/");
        let name = s[s.length - 1].split(".")[0];
        return [name, mod.default as Program];
    })) as Partial<Record<string, Program>>;
