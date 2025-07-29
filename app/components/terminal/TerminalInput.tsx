import { useListState, useWindowEvent } from "@mantine/hooks";
import { RefObject, useCallback, useLayoutEffect, useRef, useState } from "react";
import { useTerminalInputState } from "./useTerminalInputState";

export const TerminalInput = ({
    disabled,
    inputRef,
    onKeyDown,
    setValue,
    value,
}: {
    disabled?: boolean;
} & ReturnType<typeof useTerminalInputState>) => {
    const tryFocus = useCallback(() => {
        if (inputRef.current
            && !disabled
            && document.getSelection()?.isCollapsed
            && inputRef.current !== document.activeElement) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
        }
    }, [disabled]);
    useWindowEvent("mouseup", tryFocus);
    useWindowEvent("touchend", tryFocus);

    useLayoutEffect(() => {
        if (!inputRef.current) return;
        inputRef.current.style.width = ((value.length + 1) * 10.7) + "px";
    }, [value]);

    return (
        <input
            ref={inputRef}
            className="terminal-input"
            onKeyDown={onKeyDown}
            value={disabled ? "" : value}
            onChange={e => {
                setValue(e.currentTarget.value);
            }}
            disabled={disabled}
            autoCapitalize="none"
            autoComplete="off"
            spellCheck="false"
            autoFocus
        />
    );
};
