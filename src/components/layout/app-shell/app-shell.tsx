"use client";

import { QuestionsFooter } from "@/features/exam";
import { useExamSessionStore } from "@/stores/exam";
import {
  Burger,
  Group,
  AppShell as MantineAppShell,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconQuestionMark } from "@tabler/icons-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import classes from "./app-shell.module.css";

export function AppShell({ children }: React.PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();
  const examSession = useExamSessionStore();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ questionNumber: string }>();

  const currentQuestion =
    examSession.session?.active && params.questionNumber
      ? examSession.exam?.questions.find(
          (q) => q.number === Number(params.questionNumber),
        )
      : undefined;

  const isInExamSession = (): boolean => {
    if (!examSession.session?.active) return false;

    const examSlug = examSession.exam?.slug;

    if (!examSlug) return true;
    if (!pathname.includes(examSlug)) return false;
    return true;
  };

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
              <UnstyledButton
                className={classes.control}
                onClick={() => router.push(`/exams`)}
              >
                Home
              </UnstyledButton>
              <UnstyledButton
                onClick={() => router.push(`/parse`)}
                className={classes.control}
              >
                Parse
              </UnstyledButton>
              {examSession.exam &&
                examSession.session?.active &&
                !currentQuestion && (
                  <UnstyledButton
                    className={classes.control}
                    onClick={() => {
                      router.push(
                        `/exams/${examSession.exam?.slug}/questions/1`,
                      );
                    }}
                  >
                    Return to Session
                  </UnstyledButton>
                )}
              {examSession.session?.active && currentQuestion && (
                <UnstyledButton
                  className={classes.control}
                  onClick={() => {
                    examSession.endSession();
                    router.push("/exams");
                  }}
                >
                  End Session
                </UnstyledButton>
              )}
              {/* <ToggleColorScheme /> */}
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

      {examSession.session?.active && currentQuestion && (
        <QuestionsFooter question={currentQuestion} />
      )}
    </MantineAppShell>
  );
}
