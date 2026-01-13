import { useTerminalStore } from "../../store/useTerminalStore";
import { ExecutionContext } from "../../util/ctx";

export default function date(ctx: ExecutionContext) {
	useTerminalStore.getState().print({
		text: new Date().toISOString(),
	});
}
