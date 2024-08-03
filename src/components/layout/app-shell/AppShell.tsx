"use client";

import { useExamSessionStore } from "@/stores/exam";
import {
  Burger,
  Group,
  AppShell as MantineAppShell,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconQuestionMark } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import classes from "./AppShell.module.css";

export function AppShell({ children }: React.PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();
  const examSession = useExamSessionStore();
  const router = useRouter();

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <IconQuestionMark />
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton className={classes.control}>Home</UnstyledButton>
              <UnstyledButton
                className={classes.control}
                onClick={() => router.push(`/exams/react-1`)}
              >
                Blog
              </UnstyledButton>
              <UnstyledButton className={classes.control}>
                Contacts
              </UnstyledButton>
              <UnstyledButton className={classes.control}>
                Support
              </UnstyledButton>
              <UnstyledButton
                className={classes.control}
                onClick={() => examSession.endSession()}
              >
                End Session
              </UnstyledButton>
            </Group>
          </Group>
        </Group>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar py="md" px={4}>
        <UnstyledButton className={classes.control}>Home</UnstyledButton>
        <UnstyledButton className={classes.control}>Blog</UnstyledButton>
        <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
        <UnstyledButton className={classes.control}>Support</UnstyledButton>
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
}
