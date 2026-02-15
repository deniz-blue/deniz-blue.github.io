import { useTerminalStore } from "../../store/useTerminalStore";
import { ExecutionContext } from "../../util/ctx";

export default function echo(ctx: ExecutionContext) {
    useTerminalStore.getState().print(ctx.args.join(" "));
}
