import { Box, Button, FloatingIndicator, Image, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { randInt } from "~/utils/math";

// https://github.com/etherealxx/limbo-godot/blob/master/scripts/main.gd
const sequence = [
    [2, 4, 1, 3, 6, 8, 5, 7],
    [2, 4, 1, 3, 7, 5, 8, 6],
    [3, 1, 4, 2, 6, 8, 5, 7],
    [3, 1, 4, 2, 7, 5, 8, 6],
    [2, 4, 1, 6, 3, 8, 5, 7],
    [3, 1, 5, 2, 7, 4, 8, 6],
    [2, 1, 4, 3, 6, 5, 8, 7],
    [4, 3, 2, 1, 8, 7, 6, 5],
    [3, 4, 5, 6, 7, 8, 2, 1],
    [8, 7, 1, 2, 3, 4, 5, 6],
    [1, 3, 2, 5, 4, 7, 8, 6],
    [1, 3, 2, 5, 4, 8, 6, 7],
    [4, 2, 6, 1, 7, 3, 8, 5],
    [4, 2, 6, 1, 8, 3, 5, 7],
    [2, 4, 6, 1, 8, 3, 7, 5],
    [4, 1, 6, 2, 8, 3, 7, 5],
    [2, 3, 1, 5, 4, 7, 6, 8],
    [3, 1, 2, 5, 4, 7, 6, 8],

    // [5, 6, 7, 8, 1, 2, 3, 4],
    // [8, 7, 6, 5, 4, 3, 2, 1],
    // [1, 2, 3, 4, 5, 6, 7, 8]
];

// 200 BPM, 0.3 seconds per beat
const StepSpeed = 0.3;
const ShufflesAmount = 32;
const StartsAt = 9;
const ShuffleEndsAt = StartsAt + StepSpeed * ShufflesAmount;
const BeforePickDelay = 2;
const PickBeginsAt = ShuffleEndsAt + BeforePickDelay;
const FocusTextStart = 3;
const FocusTextEnd = 5;

type LimboState = "idle" | "intro" | "shuffle" | "beforepick" | "pick" | "win";
export const LimboPlayer = () => {
    const audio = useRef<HTMLAudioElement | null>(null);
    const [keyPositions, setKeyPositions] = useState<number[]>(sequence[0]);
    const [winningKey] = useState(randInt(7));
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [controlsRefs, setControlsRefs] = useState<HTMLDivElement[]>([]);
    const setControlRef = useCallback((i: number) => (node: HTMLDivElement) => {
        controlsRefs[i] = node;
        setControlsRefs(controlsRefs);
    }, []);
    const [allowClick, setAllowClick] = useState(false);
    const [userWon, setUserWon] = useState<boolean | null>(null);
    const [showFocusText, setShowFocusText] = useState(false);
    const [circle, setCircle] = useState(false);
    const [coloring, setColoring] = useState<"allred" | "hintcorrect" | "colors">("allred");

    const update = () => {
        const currentTime = audio.current?.currentTime!;
        
        const state: LimboState = !currentTime ? "idle" : (
            currentTime > ShuffleEndsAt ? (
                currentTime > PickBeginsAt ? "pick" : "beforepick"
            ) : (
                currentTime > StartsAt ? "shuffle" : (
                    "intro"
                )
            )
        );

        setColoring(state == "intro" ? "hintcorrect" : (
            (state == "beforepick" || state == "pick") ? "colors" : "allred"
        ));
        setShowFocusText(state == "shuffle" || (state == "intro" && currentTime > 3));

        if(state == "shuffle") {
            let shuffleTime = currentTime - StartsAt;
            let idx = Math.floor(shuffleTime / StepSpeed);
            console.log(idx)
            setKeyPositions(sequence[idx % sequence.length]);
        } else if(state == "intro") {
            
        } else if(state == "pick") {
            setCircle(true);
            setKeyPositions([1,2,3,4,5,6,7,8]);
            setAllowClick(true);
        }
    };

    useEffect(() => {
        audio.current = new Audio("/assets/audio/events/Isolation.mp3");
        
        const i = setInterval(() => {
            update();
        }, 30/1000);

        return () => {
            clearInterval(i);
            audio.current?.pause();
        };
    }, []);

    const [started, setStarted] = useState(false);
    const start = () => {
        audio.current!.play().then(() => setStarted(true))
            .catch(console.error);
    };

    useEffect(() => {
        start();
    }, []);

    return (
        <Stack ref={setRootRef} pos="relative">
            {Array(8).fill(0).map((_, i) => {
                const REDCOLOR = "red";
                const HINTCOLOR = "green";
                const COLORS = [
                    "red",
                    "orange",
                    "yellow",
                    "green",
                    "teal",
                    "blue",
                    "fuchsia",
                    "purple",
                ];

                const color = coloring == "allred" ? REDCOLOR : (
                    coloring == "hintcorrect" ? (
                        winningKey == i ? HINTCOLOR : REDCOLOR
                    ) : (
                        coloring == "colors" ? COLORS[i] : REDCOLOR
                    )
                );

                return (
                    <FloatingIndicator
                        target={controlsRefs[keyPositions[i] - 1]}
                        parent={rootRef}
                        key={i}
                        className="LimboKey"
                        id={`LimboKey${i}`}
                    >
                        <Box
                            onClick={() => {
                                if(!allowClick) return;
                                if(winningKey == i) {
                                    setUserWon(true);
                                    alert("correct u won awesome // TODO")
                                } else {
                                    // teehee
                                    window.open("https" + "://www.youtube.com/" + "watch?v=dQw4w9WgXcQ", "_blank");
                                    setUserWon(false);
                                }
                            }}
                            style={{
                                zIndex: 50,
                                cursor: allowClick ? "pointer" : undefined,
                                backgroundImage: "url(/assets/img/events/key.png)",
                                backgroundColor: color,
                                backgroundBlendMode: "multiply",
                                maskImage: "url(/assets/img/events/key.png)",
                                maskMode: "alpha",
                                maskSize: "50px auto",
                                maskRepeat: "no-repeat",
                                maskPosition: "center",
                                backgroundPosition: "center",
                                backgroundSize: "50px auto",
                                backgroundRepeat: "no-repeat",
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </FloatingIndicator>
                );
            })}

            {!started && <Button onClick={start} variant="light" style={{ zIndex: 1 }}>
                Click me pls
            </Button>}

            {showFocusText && (
                <Title
                    style={{
                        position: "absolute",
                        top: "50%",
                        scale: 5,
                        color: "#ff111122",
                        zIndex: -2,
                    }}
                >
                    FOCUS
                </Title>
            )}

            {circle ? (
                Array(8).fill(0).map((_, i) => {
                    const t = 0;
                    let x = Math.cos(Math.PI*i/4+t/2)*window.innerWidth*2/16;
                    let y = Math.sin(Math.PI*i/4+t/2)*window.innerWidth*2/16;
                    
                    return (
                        <Box
                            key={i}
                            ref={setControlRef(i)}
                            style={{
                                zIndex: -5,
                                position: "absolute",
                                left: x,
                                top: y + 50,
                                width: "50px",
                                height: "50px",
                            }}
                        />
                    );
                })
            ) : (
                <SimpleGrid cols={2} spacing="xl">
                    {Array(8).fill(0).map((_, i) => (
                        <Box
                            key={i}
                            ref={setControlRef(i)}
                            style={{
                                width: "50px",
                                height: "50px",
                            }}
                        />
                    ))}
                </SimpleGrid>
            )}
        </Stack>
    )
};
