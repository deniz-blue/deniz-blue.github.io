import { Coord } from "@/src/types";
import React, { useRef } from "react";
import { useState } from "react";

export interface OnekoBed {
    id: string;
    element: HTMLElement;
}

export interface OnekoAPI {
    beds: React.MutableRefObject<OnekoBed[]>;
    setBed: (id: string, element?: HTMLElement) => void;
}

export const OnekoContext = React.createContext<OnekoAPI>({
    beds: { current: [] },
    setBed: () => {},
});

export const OnekoAPIProvider = ({
    children
}: React.PropsWithChildren) => {
    const beds = useRef<OnekoBed[]>([]);

    return (
        <OnekoContext.Provider
            value={{
                beds,
                setBed: (id, element) => {
                    if(element) {
                        if (beds.current.find(x => x.id === id))
                            beds.current = beds.current.map(x => x.id === id ? { id, element } : x)
                        else
                            beds.current.push({ id, element });
                    } else {
                        beds.current = beds.current.filter(x => x.id !== id);
                    }
                },
            }}
        >
            {children}
        </OnekoContext.Provider>
    )
}
