"use client";
import { AnswersPreview } from "@/features/exam";
import { useExamSessionStore } from "@/stores/exam";
import { Container } from "@mantine/core";

export default function ParseExam() {
  const examSession = useExamSessionStore();

  return (
    <Container>
      {examSession && <AnswersPreview examSession={examSession} />}
    </Container>
  );
}
