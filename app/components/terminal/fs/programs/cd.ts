import { useFileSystemStore } from "../../store/useFileSystemStore";
import { useTerminalStore } from "../../store/useTerminalStore";
import { ExecutionContext } from "../../util/ctx";
import { FNodeType } from "../../util/fnode";
import { Path } from "../../util/Path";

export default function cd(ctx: ExecutionContext) {
    if(!ctx.args[0]) throw new Error("Usage: cd <path>");
    const path = new Path(ctx.args[0]).absolute();
    if(!path) throw new Error(`shell: cd: ${path}: No such file or directory`);
    if(useFileSystemStore.getState().node(path)?.type !== FNodeType.DIRECTORY) throw new Error(`shell: cd: ${path}: Not a directory`);
    useTerminalStore.setState({ cwd: path.absolute() });
}
