import { useTerminalStore } from "../../store/useTerminalStore";
import { ExecutionContext } from "../../util/ctx";

export default function clear(ctx: ExecutionContext) {
    useTerminalStore.getState().clear();
}
