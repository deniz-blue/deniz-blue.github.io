import { CommandContext } from "../../api";

export default function cat(ctx: CommandContext) {
    const node = ctx.fs.getNode(ctx.args[0]);
    if(!node) throw new Error(`cat: ${ctx.args[0]}: No such file or directory`);
    if(node.type == "dir") throw new Error(`cat: ${ctx.args[0]}: Is a directory`);
    ctx.stdout(node.content || "");
}
