import { createContext, PropsWithChildren, useContext, useState } from "react";

export const defaultAppFlags = {
    showTerminal: false,
    showDevice: false,
    showPamphlet: true,
    rain: false,
};

export type AppFlags = typeof defaultAppFlags;
export const AppContext = createContext<[AppFlags,(x:Partial<AppFlags>)=>void]>([defaultAppFlags, ()=>{}]);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
    const [flags, setFlags] = useState(defaultAppFlags);

    return (
        <AppContext.Provider
            value={[flags, (s: Partial<AppFlags>) => setFlags({
                ...flags,
                ...s,
            })]}
        >
            {children}
        </AppContext.Provider>
    )
};

export const useAppContext = () => useContext(AppContext);
