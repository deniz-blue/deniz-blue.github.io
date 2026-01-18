import { useTerminalStore } from "../../store/useTerminalStore";
import { ExecutionContext } from "../../util/ctx";

export default function pwd(ctx: ExecutionContext) {
	const term = useTerminalStore.getState();
	term.print({
		text: term.cwd.toString(),
		path: term.cwd,
	});
};
