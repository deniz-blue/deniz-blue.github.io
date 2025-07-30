import { CommandContext } from "../../api";
import ls from "./ls";

export default function help(ctx: CommandContext) {
    // teehee
    ls({
        ...ctx,
        args: ["/bin"],
    })
}
