import { useAppFlagsStore } from "../../../../stores/useAppFlagsStore";
import { useBackgroundStore } from "../../../background/PageBackground";
import { useTerminalStore } from "../../store/useTerminalStore";
import { ExecutionContext } from "../../util/ctx";

export default function donotuse(ctx: ExecutionContext) {
    const x = ctx.args[0];
    if (x == "f") {
        if(!ctx.args[1]) {
            useTerminalStore.getState().print(JSON.stringify(useAppFlagsStore.getState()));
			return;
        }

        const f = {
            showTerm: true,
        };
        for(let x of ctx.args.slice(1)) {
            let [k,v] = x.split("=")
            // @ts-ignore
            f[k] = (v == "false") ? false : true;
        }

        useAppFlagsStore.setState(f as any);
    } else if (x == "bg") {
        let type = ctx.args[1];
        if (type) {
            useBackgroundStore.getState().setBackground({
                type: type,
                data: {},
            } as any)
        }
    }
}
