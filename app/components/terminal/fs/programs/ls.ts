import { CommandContext, Span } from "../../api";

export default function ls(ctx: CommandContext) {
    let path = ctx.relPathToAbsPath(ctx.args.join(" ") || ".");
    if(!path) throw new Error(`ls: cannot access '${path}': No such file or directory`);
    let node = ctx.fs.getNode(path);
    for(let child of (node?.children || [])) {
        let fg: Span["fg"];
        let b: Span["b"];
        
        if(child.type == "dir") {
            fg = "Blue";
            b = true;
        };
        
        if(child.execute) {
            fg = "Green";
            b = true;
        };

        ctx.stdout({
            text: child.name,
            fg,
            b,
            filepath: ctx.fs.resolve(path+"/"+child.name),
        });

        ctx.stdout(" ");
    }
}
