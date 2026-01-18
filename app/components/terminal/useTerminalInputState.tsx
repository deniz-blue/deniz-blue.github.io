import { useRef, useState } from "react";

export const useTerminalInputState = ({
    onSubmit: _onSubmit,
    onInputValueChange: _onInputValueChange,
    onCompletionRequest,
	getHistory,
	addToHistory,
}: {
    onSubmit?: (s: string) => void;
    onInputValueChange?: (s: string) => void;
    onCompletionRequest?: (values: {
        token: string;
        input: string;
        start: number;
        end: number;
    }) => string[];
	getHistory?: () => string[];
	addToHistory?: (str: string) => void;
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(false);
    const tabCompletions = useRef<string[]>([]);
    const tabCycle = useRef(-1);

    const historyIndex = useRef<number | null>(null);

    const onSubmit = (value: string) => {
        if (getHistory && getHistory()[getHistory().length - 1] !== value) addToHistory?.(value);
        historyIndex.current = null;
        setValue("");
        _onSubmit?.(value);
    };

    const getTokenBeforeCursor = () => {
        const el = inputRef.current;
        if (!el) return { before: value, token: "", start: 0, end: value.length };

        const cursor = el.selectionStart ?? value.length;

        const left = value.slice(0, cursor);
        const right = value.slice(cursor);

        // token is last word on the left side
        const match = left.match(/(\S+)$/);
        const token = match?.[1] ?? "";

        const start = match ? match.index! : cursor;
        const end = cursor;

        return { before: left, after: right, token, start, end };
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key !== "Tab") {
            tabCompletions.current = [];
            tabCycle.current = -1;
        }

        if (e.key == "Enter") {
            e.preventDefault();
            onSubmit(value);
        } else if (e.key == "ArrowUp" || e.key == "ArrowDown") {
            e.preventDefault();
            let oldIdx = historyIndex.current;
            let newIdx = e.key == "ArrowUp" ? (
                (oldIdx == null ? (getHistory?.().length ?? 0) - 1 : oldIdx - 1)
            ) : (
                (oldIdx == null ? null : oldIdx + 1)
            );

            if (newIdx !== null && newIdx < 0) newIdx = 0;
            if (newIdx !== null && newIdx >= (getHistory?.().length ?? 0)) newIdx = null;

            setValue(newIdx === null ? "" : (getHistory?.()[newIdx] ?? ""));
            historyIndex.current = newIdx;
        } else if (e.key == "Tab") {
            e.preventDefault();
            const { token, start, end } = getTokenBeforeCursor();

            if (tabCycle.current === -1) {
                tabCompletions.current =
                    onCompletionRequest?.({
                        input: value,
                        token,
                        start,
                        end,
                    }) ?? [];

                if (tabCompletions.current.length === 0) return;

                tabCycle.current = 0;
            }

            if (tabCompletions.current.length === 0) return;

            const suggestion = tabCompletions.current[tabCycle.current];

            const newValue =
                value.slice(0, start) +
                suggestion +
                value.slice(end);

            setValue(newValue);

            requestAnimationFrame(() => {
                const el = inputRef.current;
                if (!el) return;
                const pos = start + suggestion.length;
                el.setSelectionRange(pos, pos);
            });

            if (e.shiftKey) {
                tabCycle.current =
                    (tabCycle.current - 1 + tabCompletions.current.length)
                    % tabCompletions.current.length;
            } else {
                tabCycle.current =
                    (tabCycle.current + 1)
                    % tabCompletions.current.length;
            }
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
