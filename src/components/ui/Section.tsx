import { Paper, PaperProps, PolymorphicComponentProps } from "@mantine/core";

export interface SectionProps extends PolymorphicComponentProps<"div", PaperProps> {
    hoverable?: boolean;
};

export const Section = ({ hoverable, className, ...props }: SectionProps) => {
    return (
        <Paper
            p="xs"
            className={`frost ${hoverable ? "hoverable" : ""} ${className}`}
            withBorder
            {...props}
        />
    )
};
