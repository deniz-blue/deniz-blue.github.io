import { CommandContext } from "../../api";

export default function ls(ctx: CommandContext) {
    let path = ctx.cwd + "/" + (ctx.args[0] || "");
    let node = ctx.fs.getNode(path);
    if(!node) throw new Error(`ls: cannot access '${path}': No such file or directory`);
    for(let child of (node.children || [])) {
        ctx.stdout({
            text: child.name,
            fg: child.type == "dir" ? "Blue" : undefined,
            b: child.type == "dir",
            filepath: ctx.fs.resolve(path+"/"+child.name),
        });

        ctx.stdout(" ");
    }
}
