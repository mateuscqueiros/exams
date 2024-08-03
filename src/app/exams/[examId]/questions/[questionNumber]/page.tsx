"use client";
import {
  Alternative,
  AlternativeType,
  QuestionsFooter,
  QuestionsMenu,
} from "@/features/exam";
import { useExamSessionStore } from "@/stores/exam";
import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import { notFound } from "next/navigation";
import { useState } from "react";

export default function QuestionPage({
  params: { questionNumber },
}: {
  params: { questionNumber: string };
}) {
  const [selected, setSelected] = useState<null | number>(null);
  const examSession = useExamSessionStore();

  if (!examSession.session?.active) {
    // examSession.startSession(examData);
    return notFound();
  }

  const question = examSession.exam?.questions.find(
    (q) => q.number === Number(questionNumber),
  );

  if (!question)
    return <>Não foi possível encontrar a questão número {questionNumber}</>;

  function handleSelectQuestion(selectedAnswer: AlternativeType["id"]) {
    if (question === undefined) return;

    examSession.updateQuestion({
      number: Number(questionNumber),
      questionId: question.id,
      selected: selectedAnswer,
    });
  }

  return (
    <Box style={{ position: "relative" }}>
      <Container w="100%" miw={{ md: 800 }}>
        <QuestionsMenu />
        <Center mb={100}>
          <Flex direction="column" w="100%">
            <Title order={4}>Questão 1</Title>
            <Text>{question.description}</Text>
            <Divider my={20} />
            <Box>
              <Flex direction="column" gap={20}>
                {question.alternatives.map((alt) => (
                  <Alternative
                    name="alternative"
                    label={alt.label}
                    checked={selected === alt.id}
                    key={alt.id}
                    value={alt.id}
                    onSelect={(v) => {
                      handleSelectQuestion(v);
                      setSelected(v);
                    }}
                  />
                ))}
              </Flex>
            </Box>
          </Flex>
        </Center>
        <QuestionsFooter />
      </Container>
    </Box>
  );
}