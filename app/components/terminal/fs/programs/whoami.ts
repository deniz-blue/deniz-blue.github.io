import { useTerminalStore } from "../../store/useTerminalStore";
import { ExecutionContext } from "../../util/ctx";

export default function whoami(ctx: ExecutionContext) {
	const term = useTerminalStore.getState();
	term.print({
		text: term.username,
	});
}
