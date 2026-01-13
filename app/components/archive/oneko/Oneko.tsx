import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Box, Text, Tooltip } from "@mantine/core";
import { useContext } from "react";
import { OnekoContext } from "./OnekoAPI";
import { randInt, randArr, eucDist, vec, vecSub, vecMul, vecTup, vecDiv } from "../../utils/utils";
import { Coord } from "@/src/types";
import { createFactory, Enum, match, variant } from "@alan404/enum";
import { getSprite, OnekoSkin, OnekoSkins, SpriteName } from "./OnekoData";
import { useAppScroll } from "@/src/utils/useAppScroll";

const NekoState = createFactory<NekoState>();
type NekoState = Enum<{
    untouched: {};
    sleeping: {};
    idle: {};
    sit: {};
    follow: {
        target: Coord;
        afterTargetReached?: "sleep" | "sit";
    };
    dragging: {
        previousState: NekoState;
        startPosition: Coord;
        direction?: "N" | "S" | "E" | "W";
    };
}>;

type NekoOptions = {
    speed: number;
    minFollowDist: number;
};

const defaultOnekoOptions: NekoOptions = {
    speed: 10,
    minFollowDist: 48,
};

type Neko = {
    skin: OnekoSkin;
    state: NekoState;
    position: Coord;
    options: NekoOptions;
};

const nekoSpeed = 10;

export const Oneko = () => {
    const { beds } = useContext(OnekoContext);
    const [speak, setSpeak] = useState("");
    const ref = useRef<HTMLDivElement>(null);
    let sayTimeoutRef = useRef<number | null>();

    const say = (s: string, keep = false) => {
        setSpeak(s);
        if (sayTimeoutRef.current) clearTimeout(sayTimeoutRef.current);
        if (keep) return;
        sayTimeoutRef.current = setTimeout(() => {
            setSpeak("");
            sayTimeoutRef.current = null;
        }, 1500);
    };

    const scrollY = useRef(0);
    useAppScroll((y) => scrollY.current = y);

    const elementPos = (e?: HTMLElement) => e && e.getBoundingClientRect();
    const getInitialPosition = () => elementPos(beds.current.find(x => x.id == "initial")?.element)
            || elementPos(beds.current.find(x => x.id == "fallback")?.element)
            || vec(0, 0);

    const onekoRef = useRef<Neko>({
        skin: OnekoSkins[1],
        options: defaultOnekoOptions,
        position: getInitialPosition(),
        state: NekoState.untouched({}),
    });

    useEffect(() => {
        if (!ref.current) return;

        const { current: neko } = onekoRef;

        let setNekoState = (state: NekoState) => {
            console.debug("setNekoState", state);
            neko.state = state;
        };

        // Transitions

        const onekoActions = {
            wakeUp: () => {
                setNekoState(NekoState.idle({}));
                //say("*yawn* car activated owo");
            },
            pet: () => {
                new Audio(randArr(neko.skin.meows)).play();
                explodeHearts();
            },
            sleep: () => {

            },
            sit: () => {
                setNekoState(NekoState.sit({}));
                say("oki i sit :3");
            },
            standUp: () => {
                setNekoState(NekoState.idle({}));
                say("mice following mode");
            },
        };

        const onekoEventHandlers = {

        };

        // Events

        const onNekoInputDown = (initial: Coord) => {
            console.log("onNekoInputDown", structuredClone(neko));
            if(neko.state.type == "dragging") return;
            setNekoState(NekoState.dragging({
                previousState: neko.state,
                startPosition: initial,
            }));
        }

        const onNekoInputUp = () => {
            console.log("onNekoInputUp", structuredClone(neko));
            if (neko.state.type == "dragging") {
                let to = match<NekoState, NekoState>(neko.state.data.previousState)({
                    dragging: () => NekoState.idle({}),
                    follow: () => NekoState.idle({}),
                    _: (v) => v,
                });
                setNekoState(to || neko.state.data.previousState || NekoState.idle({}));
            }
        }

        const onInputMove = (target: Coord) => {
            if(neko.state.type == "dragging") {
                let distFromStart = Math.sqrt(
                    (target.x - neko.state.data.startPosition.x) ** 2 + (target.y - neko.state.data.startPosition.y) ** 2
                );

                const delta: Coord = {
                    x: target.x - neko.position.x,
                    y: target.y - neko.position.y,
                };
                
                const absDelta: Coord = {
                    x: Math.abs(delta.x),
                    y: Math.abs(delta.y),
                };

                // Scratch in the opposite direction of the drag
                let dir: "N" | "S" | "E" | "W" | null = null;
                if (absDelta.x > absDelta.y) {
                    dir = delta.x > 0 ? "W" : "E";
                } else if (absDelta.y > absDelta.x) {
                    dir = delta.y > 0 ? "N" : "S";
                }

                setNekoPos(target);

                if (neko.state.data.direction || distFromStart > 32) {
                    if (dir) neko.state.data.direction = dir;
                }

                return;
            }

            if ((["untouched", "sleeping", "sit"] as NekoState["type"][]).includes(neko.state.type)) return;

            if(eucDist(neko.position.x - target.x, neko.position.y - target.y) < neko.options.minFollowDist) return;

            if(neko.state.type == "follow" || neko.state.type == "idle")
                setNekoState(NekoState.follow({ target }));
        }

        const onWindowResize = () => {
            if ((["follow"] as NekoState["type"][]).includes(neko.state.type)) return;

            // If neko is outside the window and is forced to sleep, wake her up
            if (
                neko.position.x - window.innerWidth > 32 ||
                neko.position.y - window.innerHeight > 32
            ) {
                setNekoState(NekoState.idle({}));
            }
        };

        const onNekoDoubleClick = () => {
            match((neko.state.type == "dragging") ? (neko.state.data.previousState || NekoState.idle({})) : (neko.state))({
                sit: () => onekoActions.standUp(),
                follow: () => onekoActions.sit(),
                idle: () => onekoActions.sit(),
                sleeping: () => onekoActions.wakeUp(),
                untouched: () => onekoActions.wakeUp(),
                _: () => {},
            });
        };

        const explodeHearts = () => {
            if(!ref.current) return;
            const parent = ref.current.parentElement;
            if(!parent) return;
        
            for (let i = 0; i < 10; i++) {
              const heart = document.createElement('div');
              heart.className = 'heart';
              heart.textContent = '❤';
              const offsetX = (Math.random() - 0.5) * 50;
              const offsetY = (Math.random() - 0.5) * 50;
              heart.style.left = `${neko.position.x - offsetX - 16}px`;
              heart.style.top = `${neko.position.y - offsetY - 16}px`;
              parent.appendChild(heart);
        
              setTimeout(() => {
                parent.removeChild(heart);
              }, 1000);
            }
        }

        const onNekoRightClick = (e: MouseEvent) => {
            e.preventDefault();
            onekoActions.pet();
        };

        // Wrapper event handlers

        const coord = ({ clientX, clientY }: { clientX: number; clientY: number }) =>
            vec(clientX, clientY + scrollY.current);

        const onMouseMove = (e: MouseEvent) => onInputMove(coord(e));
        const onNekoMouseUp = (e: MouseEvent) => onNekoInputUp();
        const onNekoTouchMove = (e: TouchEvent) => e.touches.length == 1 && onInputMove(coord(e.touches[0]));
        const onNekoTouchEnd = (e: TouchEvent) => {
            if(e.touches.length !== 1) return;
            onInputMove(coord(e.touches[0]));
            onNekoInputUp();
        };

        const onNekoMouseDown = (e: MouseEvent) => {
            if (e.button !== 0) return;
            e.preventDefault();
            onNekoInputDown(coord(e));
        };

        const onNekoTouchStart = (e: TouchEvent) => {
            if (e.touches.length !== 1) return;
            onTouchStartDblClick(e);
            e.preventDefault();
            onNekoInputDown(coord(e.touches[0]));
        };
        
        // https://stackoverflow.com/questions/45804917/dblclick-doesnt-work-on-touch-devices
        // TODO: rewrite
        let expired;
        const onTouchStartDblClick = (e: TouchEvent) => {
            if (e.touches.length !== 1) return;
            if (!expired) {
                expired = e.timeStamp + 400
            } else if (e.timeStamp <= expired) {
                // remove the default of this event ( Zoom )
                e.preventDefault()
                onNekoDoubleClick()
                // then reset the variable for other "double Touches" event
                expired = null
            } else {
                // if the second touch was expired, make it as it's the first
                expired = e.timeStamp + 400
            }
        };
        
        // Render

        let positionTopOffset = 0;
        const setNekoPos = ({ x, y }: Coord) => {
            neko.position = { x, y };
            ref.current!.style.left = `${x - 16}px`;
            ref.current!.style.top = `${y - positionTopOffset - 16}px`;
        };

        // Update

        let frame = 0;
        const update = () => {
            frame++;

            if(ref.current) {
                ref.current.style.opacity = (beds.current.length == 0) ? "0" : "1";
            }

            const setSprite = (name: SpriteName) => {
                const [x, y] = getSprite(name, name == "sleeping" ? Math.floor(frame/8) : frame);
                if (!ref.current) return;
                ref.current.style.backgroundPosition = `${x * 32}px ${y * 32}px`;
            }

            match(neko.state)({
                dragging: ({ direction }) => direction && setSprite("scratchWall"+direction as SpriteName),
                
                untouched: () => {
                    setSprite("sleeping");
                    let { x, y } = getInitialPosition();
                    setNekoPos({
                        x,
                        y: y + scrollY.current,
                    });
                },
                sleeping: () => setSprite("sleeping"),

                idle: () => setSprite("idle"),
                sit: () => setSprite("idle"),
                
                follow: ({ target }) => {
                    const diff: Coord = {
                        x: neko.position.x - target.x,
                        y: neko.position.y - target.y,
                    };
        
                    const distance = Math.sqrt(diff.x ** 2 + diff.y ** 2);

                    if(distance < neko.options.minFollowDist) {
                        setNekoState(NekoState.idle({}));
                        return;
                    }

                    let direction = diff.y / distance > 0.5 ? "N" : "";
                    direction += diff.y / distance < -0.5 ? "S" : "";
                    direction += diff.x / distance > 0.5 ? "W" : "";
                    direction += diff.x / distance < -0.5 ? "E" : "";
                    if (direction) setSprite(direction as SpriteName);

                    setNekoPos(vecSub(neko.position, vecMul(vecDiv(diff, vecTup(distance)), vecTup(neko.options.speed))));
                },

                _: () => {},
            });
        };

        // Loop

        let i = setInterval(() => update(), 100);

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("resize", onWindowResize);
        ref.current.addEventListener("touchmove", onNekoTouchMove);
        ref.current.addEventListener("touchstart", onNekoTouchStart);
        ref.current.addEventListener("touchend", onNekoTouchEnd);
        ref.current.addEventListener("dblclick", onNekoDoubleClick);
        ref.current.addEventListener("mousedown", onNekoMouseDown);
        ref.current.addEventListener("mouseup", onNekoMouseUp);
        ref.current.addEventListener("contextmenu", onNekoRightClick);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", onWindowResize);
            ref.current?.removeEventListener("touchmove", onNekoTouchMove);
            ref.current?.removeEventListener("touchstart", onNekoTouchStart);
            ref.current?.removeEventListener("touchend", onNekoTouchEnd);
            ref.current?.removeEventListener("dblclick", onNekoDoubleClick);
            ref.current?.removeEventListener("mousedown", onNekoMouseDown);
            ref.current?.removeEventListener("contextmenu", onNekoRightClick);
            clearInterval(i);
        };
    }, [ref.current]);

    return (
        <Box w={0} h={0} pos="relative">
            <Tooltip
                label={(
                    <Text fz={10}>
                        {speak}
                    </Text>
                )}
                disabled={!speak}
                opened={!!speak}
                withArrow
            >
                <div
                    id="oneko"
                    ref={ref}
                    style={{
                        width: "32px",
                        height: "32px",
                        position: "relative",
                        backgroundImage: OnekoSkins[0].spriteSet,
                        imageRendering: "pixelated",
                        overflow: "hidden",
                        zIndex: 900,
                        opacity: "0",
                    }}
                />
            </Tooltip>
        </Box>
    )
}
