"use client";

import { AnswersPreview } from "@/features/exam";
import { useExamSessionStore } from "@/stores/exam";
import { examAnswers } from "@/values";
import { Container, useMantineTheme } from "@mantine/core";

export default function PostExam() {
  const theme = useMantineTheme();
  const examSession = useExamSessionStore();
  const answers = examAnswers;

  if (!examSession.session?.active) {
    // populateSession(examSession);
    // return;
    return <>Não existe uma sessão ativa para este teste</>;
  }

  return (
    <Container maw={1200}>
      <AnswersPreview
        //answerKey={answers}
        examSession={examSession}
      />
    </Container>
  );
}
