import { Background } from "../../../../contexts/background/BackgroundContext";
import { CommandContext } from "../../api";

export default function donotuse(ctx: CommandContext) {
    const x = ctx.args[0];
    if (x == "f") {
        let f = ctx.args[1];
        ctx.app.setFlags({
            [f]: true,
            showTerminal: ctx.args.includes("showterm"),
        })
    } else if (x == "bg") {
        let type = ctx.args[1];
        if (type) {
            ctx.app.setBackground({
                type: type as any,
            })
        }
    }
}
