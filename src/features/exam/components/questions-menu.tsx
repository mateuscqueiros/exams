"use client";

import { useExamSessionStore } from "@/stores/exam";
import { ActionIcon, Button, Center, Drawer, Grid, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCaretLeft, IconCaretRight } from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { QuestionType } from "../exam.types";

export type QuestionsMenuType = {
  selectedQuestion: QuestionType;
};

export function QuestionsMenu({ selectedQuestion }: QuestionsMenuType) {
  const params = useParams<{ examId: string; questionId: string }>();
  const [opened, { close, toggle }] = useDisclosure(false);
  const examSession = useExamSessionStore();

  if (!examSession.session) return <>Nenhuma sessão ativa</>;
  if (!examSession.exam?.questions) return <>Sem questões</>;

  const selectedQuestionsNumbers = examSession.session.answers.map(
    (q) => q.number,
  );

  return (
    <>
      <ActionIcon
        onClick={toggle}
        style={{ position: "absolute", top: 0, right: 0 }}
      >
        {opened ? <IconCaretRight /> : <IconCaretLeft />}
      </ActionIcon>
      <Drawer
        zIndex={201}
        position="right"
        offset={8}
        radius="md"
        opened={opened}
        onClose={close}
        title="Questões"
      >
        <Text size="sm">
          {examSession.exam.questions.length -
            examSession.session.answers.length}{" "}
          questões pendentes
        </Text>
        <Grid mt={20} gutter={10}>
          {examSession.exam?.questions.map((question, i) => {
            const isSelected = question.number === selectedQuestion.number;
            const isAnswered = selectedQuestionsNumbers.includes(
              question.number,
            );

            return (
              <Grid.Col span={2.4} key={i}>
                <Center>
                  <Button
                    radius="sm"
                    size="sm"
                    component={Link}
                    href={`/exams/${params.examId}/questions/${question.number}`}
                    color={isAnswered ? "lime.5" : undefined}
                    variant={isSelected ? "filled" : "outline"}
                  >
                    {question.number}
                  </Button>
                </Center>
              </Grid.Col>
            );
          })}
        </Grid>
      </Drawer>
    </>
  );
}
