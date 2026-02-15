import { useFileSystemStore } from "../../store/useFileSystemStore";
import { useTerminalStore } from "../../store/useTerminalStore";
import { ExecutionContext } from "../../util/ctx";
import { FNodeType } from "../../util/fnode";
import { Path } from "../../util/Path";
import { Span } from "../../util/span";

export default function ls(ctx: ExecutionContext) {
    let path = new Path(ctx.args[0] || ".").absolute();
    let node = useFileSystemStore.getState().node(path);
    if(node?.type !== FNodeType.DIRECTORY) throw new Error(`ls: cannot access '${path}': No such file or directory`);

	for(let name in node.children) {
		let child = node.children[name];
		if(child.hidden) continue;
		
		let fg: Span["fg"];
		let b: Span["b"];

		if(child.type == FNodeType.DIRECTORY) {
			fg = "Blue";
			b = true;
		};
		
		if(child.type == FNodeType.EXECUTABLE) {
			fg = "Green";
			b = true;
		};

		useTerminalStore.getState().print({
			text: name,
			path: path.join(name),
			fg,
			b,
		});

		useTerminalStore.getState().print(" ");
	};
};
