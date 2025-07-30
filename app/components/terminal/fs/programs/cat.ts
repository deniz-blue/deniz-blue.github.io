import { CommandContext } from "../../api";

export default function cat(ctx: CommandContext) {
    if(!ctx.args[0]) throw new Error(`cat: Please provide arguments mrrow~`);
    const path = ctx.relPathToAbsPath(ctx.args[0]);
    if(!path) throw new Error(`cat: ${ctx.args[0]}: No such file or directory`);
    const node = ctx.fs.getNode(path)!;
    if(node.type == "dir") throw new Error(`cat: ${ctx.args[0]}: Is a directory`);
    ctx.stdout(node.content || "");
}
