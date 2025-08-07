import { useListState, useLocalStorage } from "@mantine/hooks";
import { useRef, useState } from "react";

export const useTerminalInputState = ({
    onSubmit: _onSubmit,
    onInputValueChange: _onInputValueChange,
}: {
    onSubmit?: (s: string) => void;
    onInputValueChange?: (s: string) => void;
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(false);

    const [history, setHistory] = useLocalStorage<string[]>({
        key: "deniz.blue:terminal-history",
        defaultValue: [],
    });

    const historyIndex = useRef<number | null>(null);

    const onSubmit = (value: string) => {
        if (history[history.length - 1] !== value) setHistory(prev => [...prev, value]);
        historyIndex.current = null;
        setValue("");
        _onSubmit?.(value);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key == "Enter") {
            e.preventDefault();
            onSubmit(value);
        } else if (e.key == "ArrowUp" || e.key == "ArrowDown") {
            e.preventDefault();
            let oldIdx = historyIndex.current;
            let newIdx = e.key == "ArrowUp" ? (
                (oldIdx == null ? (history.length - 1) : oldIdx - 1)
            ) : (
                (oldIdx == null ? null : oldIdx + 1)
            );

            if (newIdx !== null && newIdx < 0) newIdx = 0;
            if (newIdx !== null && newIdx >= history.length) newIdx = null;

            setValue(newIdx === null ? "" : history[newIdx]);
            historyIndex.current = newIdx;
        } else if (e.key == "Tab") {
            e.preventDefault();
        } else {

        }
    };

    return {
        inputRef,
        onKeyDown,
        value,
        setValue: (s: string) => {
            setValue(s);
            _onInputValueChange?.(s);
        },
        submit: onSubmit,
        disabled,
        setDisabled,
    };
};
