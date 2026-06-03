import { useAppFlagsStore } from "../../../../stores/useAppFlagsStore";
import { useBackgroundStore } from "../../../background/PageBackground";
import { ExecutionContext } from "../../util/ctx";

export default function shutdown(ctx: ExecutionContext) {
	useAppFlagsStore.setState({
		showTerminal: false,
	});

	useBackgroundStore.getState().setBackground({ type: "null", data: {} });
};
