import { Box, Text } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useState } from "react";

export interface TyperTextNode {
    text?: string;
    sound?: string;
    color?: string;
};

export const Typer = ({
    nodes,
}: {
    nodes: TyperTextNode[];
}) => {
    const [pos, setPos] = useState(0);

    useHotkeys([
        ["z", () => {
            setPos(p => p + 1)
        }],
        ["x", () => {
            setPos(p => 0)
        }],
    ]);

    // debugger

    let filteredNodes: TyperTextNode[] = [];

    let acc = 0;
    for (let node of nodes) {
        let text = node.text ?? "";
        let sliced = (text.length + acc < pos) ? text : text.slice(0, pos - acc);
        filteredNodes.push({
            ...node,
            text: sliced,
        })
        acc += sliced.length;
    }

    return (
        <Box>
            <Text ff="deltarune" inline inherit span>
                {filteredNodes.map((node, i) => (
                    <Text
                        inline
                        inherit
                        span
                        key={i}
                        style={{
                            color: node.color || "white",
                        }}
                    >
                        {node.text}
                    </Text>
                ))}
            </Text>
        </Box>
    )
};

