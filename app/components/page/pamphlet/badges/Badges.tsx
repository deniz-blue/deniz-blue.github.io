import { PropsWithChildren, ReactNode } from "react";
import { Divider, Flex, Group, SimpleGrid, Stack, Text } from "@mantine/core";

import REJECT_HUMANITY from "./reject_humanity.png";
import FUFU_BADGE from "./fufu_badge.png";
import SKYLAR_YAMERO from "./skylar-yamero.gif";
import "./badges.css";

export const ButtonsSection = () => {
    return (
        <Stack align="center" w="100%" px="sm">
            <Divider
                label={"88x31"}
                w="80%"
            />

            <Stack gap={4}>
                <Badges />

                <Group justify="start" ta="start" c="dimmed" gap={4}>
                    <Text fz="xs">

                    </Text>
                </Group>
            </Stack>
        </Stack>
    )
};

export const BadgesRows = ({ children }: PropsWithChildren) => {
    return (
        <SimpleGrid cols={3} spacing={4} verticalSpacing={4} className="badges-container">
            {children}
        </SimpleGrid>
    );
};

export const BadgesDivider = ({ label }: { label?: ReactNode }) => {
    return null;

    return (
        <Divider
            w="100%"
            style={{ lineHeight: 0 }}
            variant="dotted"
            labelPosition="left"
            label={typeof label == "string" ? (
                <Text inherit fz="xs">
                    {label}
                </Text>
            ) : label}
        />
    );
}

export const Badges = () => {
    return (
        <Stack gap={4}>
            <BadgesDivider label="Me" />
            <BadgesRows>
                <Badge src="/assets/88x31v0.png" href={null} />
                <Badge src="https://badge.les.bi/88x31/pan/trans/75-degree.svg" />
                <Badge src={REJECT_HUMANITY} href={null} />
            </BadgesRows>
            <BadgesDivider label="People I know" />
            <BadgesRows>
                <Badge src="https://gaze.systems/88x31.gif" />
                <Badge src="https://slonk.ing/img/88x31.webp" />
                <Badge src="https://kayceecat.neocities.org/buttons/kayceecat.gif" />
                <Badge src="https://wamwoowam.co.uk/88x31.png" />
                <Badge src="https://uwx.github.io/uwx.png" />
                <Badge src="https://vea.st/button.png" />
                <Flex
                    justify="center"
                    align="end"
                    style={{
                        width: 88,
                        height: 101,
                        gridRow: "span 3",
						backgroundColor: "var(--mantine-color-violet-light)",
                    }}
                >
                    <a
                        className="soulSelectable mantine-focus-auto"
                        href={"https://skyrina.dev"}
						aria-label="skyrina.dev link"
                        target="_blank"
                        style={{
                            width: 88,
                            height: 101,
                            display: "flex",
                            alignItems: "end",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={SKYLAR_YAMERO}
							role="presentation"
                            width={48}
                            height={80}
                            loading="lazy"
                        />
                    </a>
                </Flex>
                <Badge src="https://such.blue/res/button.png" />
                <Badge src={FUFU_BADGE} href="https://burakfufu.carrd.co/" />
                {/* Fun */}
                <Badge src="/assets/img/88x31/kris-where-tf-are-we.png" href={null} />
                <Badge src="/assets/img/88x31/tidalwave.gif" href={null} />
                <Badge src="/assets/img/88x31/bad-apple-optimized.gif" href={null} />
                <Badge src="/assets/img/88x31/tested-on-firefox.gif" href={null} />
                <Badge src="https://s.mew.gay/88x31/crouton.gif" href="https://crouton.net" />
                {/* Inspired Sites */}
                <Badge src="https://oat.zone/badges/oatzone.gif" />
                <Badge src="https://split.pet/88x31/split.png" />
                <Badge src="https://dimden.dev/services/images/88x31.gif" />
                {/* Other Sites */}
				<Badge src="https://yugoslavia.best/assets/blinchik.gif" />
				<Badge src="https://ida.puwulsewave.gay/img/button/ida.gif" />
				<Badge src="https://ida.puwulsewave.gay/img/button/lua.png" href="https://foxgirl.dev" />
                <Badge src="https://aspyn.gay/88x31.gif" />
                <Badge src="https://maia.crimew.gay/badges/maia.crimew.gay.png" />
                <Badge src="https://ruby.gay/88x31/gif.gif" />
                <Badge src="https://badges.easrng.net/easrng.gif" href="https://easrng.net" />
                <Badge src="https://zptr.cc/88x31/webring/zeroptr.png" />
                <iframe
                    src="https://incr.easrng.net/badge?key=deniz.blue"
                    style={{ background: "url(https://incr.easrng.net/bg.gif)", border: "unset" }}
                    title="increment badge"
                    width="88"
                    height="31"
                    className="badge"
                />
            </BadgesRows>
        </Stack>
    )
};

export const Badge = ({
    src,
    href,
    title,
}: {
    src: string;
    title?: string;
    href?: string | null;
}) => {
    const { hostname, origin } = src.startsWith("http") ? new URL(src) : { hostname: "", origin: "" };

    let img = (
        <img
            src={src}
            title={href ? hostname : undefined}
			aria-label={title || hostname || "88x31 Badge"}
            role={(href === null) ? "presentation" : undefined}
            width={88}
            height={31}
            loading="lazy"
            tabIndex={(href === null) ? 0 : undefined}
            onClick={(href === null) ? () => {} : undefined} // a11y hack
            className={(href === null) ? "soulSelectable mantine-focus-auto" : undefined}
        />
    );

    return (
        <div className="badge">
            {href === null ? img : (
                <a
                    className="soulSelectable mantine-focus-auto"
                    href={href || origin}
                    target="_blank"
					aria-label={title || hostname || "88x31 Badge Link"}
					tabIndex={0}
                >
                    {img}
                </a>
            )}
        </div>
    )
};
