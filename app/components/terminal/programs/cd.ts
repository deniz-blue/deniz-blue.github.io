import { CommandContext } from "../api";

export default function cd(ctx: CommandContext) {
    let path = ctx.fs.resolve((ctx.args[0][0] == "/" ? "" : (ctx.cwd+"/"))+ctx.args[0]);
    if(!ctx.fs.exists(path)) throw new Error(`shell: cd: ${path}: No such file or directory`);
    ctx.cd(path);
}
