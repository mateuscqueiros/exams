"use client";
import { Box, Title } from "@mantine/core";

export type PageSectionProps = {
  title: string;
} & React.PropsWithChildren;

export function PageSection({ title, children }: PageSectionProps) {
  return (
    <Box>
      <Title order={2} mb="md">
        {title}
      </Title>
      {children}
    </Box>
  );
}
