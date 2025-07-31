import { CommandContext } from "../../api";

export default function cd(ctx: CommandContext) {
    if(!ctx.args[0]) throw new Error("Usage: cd <path>");
    let path = ctx.relPathToAbsPath(ctx.args[0]);
    if(!path) throw new Error(`shell: cd: ${path}: No such file or directory`);
    if(ctx.fs.getNode(path)?.type !== "dir") throw new Error(`shell: cd: ${path}: Not a directory`);
    ctx.cd(path);
}
