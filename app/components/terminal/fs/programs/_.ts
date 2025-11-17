import { CommandContext } from "../../api";

export default function donotuse(ctx: CommandContext) {
    const x = ctx.args[0];
    if (x == "f") {
        if(!ctx.args[1]) {
            ctx.stdout(JSON.stringify(ctx.app.getFlags()))
        }

        const f = {
            showTerm: true,
        };
        for(let x of ctx.args.slice(1)) {
            let [k,v] = x.split("=")
            // @ts-ignore
            f[k] = (v == "false") ? false : true;
        }

        ctx.app.setFlags(f as any);
    } else if (x == "bg") {
        let type = ctx.args[1];
        if (type) {
            ctx.app.setBackground({
                type: type,
                data: {},
            } as any)
        }
    }
}
