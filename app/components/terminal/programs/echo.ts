import { CommandContext } from "../api";

export default function echo(ctx: CommandContext) {
    ctx.stdout(ctx.args.join(" "));
}
