"use client";
import {
  Alternative,
  AlternativeType,
  FinishButton,
  QuestionBody,
  QuestionsMenu,
} from "@/features/exam";
import { useExamSessionStore } from "@/stores/exam";
import { examData } from "@/values";
import { Box, Center, Container } from "@mantine/core";
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
    // return;
    return <>Não existe uma sessão ativa para este teste</>;
  }

  const question = examSession.exam?.questions.find(
    (q) => q.number === Number(questionNumber),
  );

  if (!question)
    return <>Não foi possível encontrar a questão número {questionNumber}</>;

  const selectedAlternative = examSession.session.answers.find(
    (q) => q.number === Number(questionNumber),
  );

  function handleSelectAlternative(selectedAnswer: AlternativeType["id"]) {
    if (question === undefined) return;

    examSession.updateQuestion({
      number: Number(questionNumber),
      questionId: question.id,
      alternativeId: selectedAnswer,
    });
  }

  return (
    <Box style={{ position: "relative" }}>
      <Container w="99%" miw={{ md: 800 }}>
        <QuestionsMenu selectedQuestion={question} />
        <Center mb={100}>
          <QuestionBody
            question={question}
            alternatives={question.alternatives.map((alt) => {
              const isSelected =
                selected === null
                  ? selectedAlternative?.alternativeId === alt.id
                  : selected === alt.id;

              return (
                <Alternative
                  name="alternative"
                  label={alt.label}
                  checked={isSelected}
                  key={alt.id}
                  value={alt.id}
                  onSelect={(v) => {
                    handleSelectAlternative(v);
                    setSelected(v);
                  }}
                />
              );
            })}
          />
        </Center>
        {examSession.session.answers.length ===
          examSession.exam?.questions.length && <FinishButton />}
      </Container>
    </Box>
  );
}
