import { useEffect, useState } from "react";

export const useDynamic = <T,>(fn: () => T) => {
	const [state, setState] = useState<T | null>(null);

	useEffect(() => {
		setState(fn());
	}, [fn]);

	return state;
};
