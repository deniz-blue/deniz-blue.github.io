import { ComponentType, PropsWithChildren } from "react"

export const ContextStack = ({
    providers,
    children,
}: {
    providers: ComponentType<PropsWithChildren>[];
} & PropsWithChildren) => {
    return (
        <>
            {providers.reduceRight((acc, Provider) => (
                <Provider>
                    {acc}
                </Provider>
            ), children)}
        </>
    )
}
