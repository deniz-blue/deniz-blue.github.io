import { useFileSystemStore } from "../../store/useFileSystemStore";
import { useTerminalStore } from "../../store/useTerminalStore";
import { ExecutionContext } from "../../util/ctx";
import { FNodeType } from "../../util/fnode";
import { Path } from "../../util/Path";

export default function cat(ctx: ExecutionContext) {
	const fs = useFileSystemStore.getState();
    if(!ctx.args[0]) throw new Error(`cat: Please provide arguments mrrow~`);
    const path = new Path(ctx.args[0]).absolute();
    if(!fs.exists(path)) throw new Error(`cat: ${path.shorten()}: No such file or directory`);
    const node = fs.node(path)!;
    if(node.type == FNodeType.DIRECTORY) throw new Error(`cat: ${path.shorten()}: Is a directory`);
    if(node.type == FNodeType.EXECUTABLE) throw new Error(`cat: ${path.shorten()}: Is an executable`);
    useTerminalStore.getState().print(node.content || "");
}
