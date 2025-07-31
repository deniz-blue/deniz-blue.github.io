import React, { RefObject, useEffect, useRef } from "react";

export const useScrollBottom = (deps: React.DependencyList) => {
    const ref = useRef<HTMLElement>(null);
    useEffect(() => {
        // ref.current?.scrollTo({ top: ref.current.scrollHeight });
        // window.scrollTo({ top: document.body.scrollHeight })
    }, [ref, ...deps]);
    return ref;
};
