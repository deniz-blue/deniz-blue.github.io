import { createContext, PropsWithChildren, useState } from "react";
import { LanguageProvider } from "@alan404/react-localization";

export const LocalizationProvider = ({ children }: PropsWithChildren) => {
    return (
        <LanguageProvider supportedLanguages={["en", "tr"]} initialLanguage="en">
            {children}
        </LanguageProvider>
    );
};
