import { useTerminalStore } from "../../store/useTerminalStore";
import { ExecutionContext } from "../../util/ctx";

export default function man(ctx: ExecutionContext) {
	const term = useTerminalStore.getState();
	term.print({
		text: `Try running woman instead 🙄`,
	});
}
