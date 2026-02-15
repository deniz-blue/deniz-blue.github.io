import { toRomaji } from "wanakana";

export const MaybeRuby = ({
    children,
}: {
    children: string;
}) => {
    const ro = toRomaji(children);

    if (ro == children) return children;
    return (
        <ruby style={{ fontSize: 12 }}>
            {children}
            <rp> (</rp>
            <rt style={{ fontSize: 10 }}>{ro}</rt>
            <rp>)</rp>
        </ruby>
    );
};
