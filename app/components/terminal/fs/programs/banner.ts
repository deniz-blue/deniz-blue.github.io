import { useTerminalStore } from "../../store/useTerminalStore";
import { ExecutionContext } from "../../util/ctx";
import { Path } from "../../util/Path";

export default function banner(ctx: ExecutionContext) {
	const term = useTerminalStore.getState();
	term.print({ text: "SHARK OS v0.03\n", fg: "Cyan", b: true });
	term.print({ text: "Type '", fg: "BrightBlack" });
	term.print({ text: "help", fg: "BrightBlack", path: new Path("/bin/help"), b: true });
	term.print({ text: "' for a list of commands\n", fg: "BrightBlack" });
	term.print({
		text: `Last login: ${new Date().toLocaleString("en", {
			dateStyle: "long",
		})} from ::1\n`, fg: "BrightBlack"
	});
}
