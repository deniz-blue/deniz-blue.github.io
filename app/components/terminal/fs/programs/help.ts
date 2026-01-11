import { useTerminalStore } from "../../store/useTerminalStore";
import { ExecutionContext } from "../../util/ctx";
import ls from "./ls";

export default function help(ctx: ExecutionContext) {
    useTerminalStore.getState().print("Available commands:\n");
    ls({
        ...ctx,
        args: ["/bin"],
    })
}
