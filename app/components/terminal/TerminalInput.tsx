import { useIsFirstRender, useListState, useWindowEvent } from "@mantine/hooks";
import { RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTerminalInputState } from "./useTerminalInputState";
import { useAppContext } from "../../contexts/app/AppContext";

export const TerminalInput = ({
    inputRef,
    onKeyDown,
    setValue,
    value,
    disabled,
}: ReturnType<typeof useTerminalInputState>) => {
    const [{ showTerminal }] = useAppContext();

    const tryFocus = useCallback(() => {
        if(!showTerminal) return;

        if (inputRef.current
            && !disabled
            && document.getSelection()?.isCollapsed
            && inputRef.current !== document.activeElement) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
        }
    }, [disabled, showTerminal]);

    useWindowEvent("mouseup", tryFocus);
    useWindowEvent("touchend", tryFocus);
    useEffect(() => tryFocus(), [showTerminal]);

    useLayoutEffect(() => {
        if (!inputRef.current) return;
        inputRef.current.style.width = (value.length || 1) + "ch";
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
            // readOnly={isFirstRender ? true : undefined}
            disabled={disabled}
            autoCapitalize="none"
            autoComplete="off"
            spellCheck="false"
            autoFocus
        />
    );
};
