"use client";

import { AnswersPreview } from "@/features/exam";
import { useExamSessionStore } from "@/stores/exam";
import { examData } from "@/values";
import { Center, Container, Text, useMantineTheme } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";

export default function PostExam() {
  const theme = useMantineTheme();
  const examSession = useExamSessionStore();

  if (!examSession.session?.active) {
    examSession.startSession(examData);
    examSession.updateQuestion({
      questionId: 0,
      alternativeId: 2,
      number: 1,
    });

    examSession.updateQuestion({
      questionId: 1,
      alternativeId: 3,
      number: 2,
    });
    return;
    // return <>Não existe uma sessão ativa para este teste</>;
  }

  return (
    <Container maw={1200}>
      <Center mb="xl" w="100%">
        <IconCircleCheck color={theme.colors.lime[6]} />
        <Text ml="xs">Seu exame está salvo localmente.</Text>
      </Center>
      <AnswersPreview examSession={examSession} />
    </Container>
  );
}
