"use client";

import { useExamSessionStore } from "@/stores/exam";
import { Affix, Button, Flex, Progress, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import { QuestionType } from "../exam.types";

export type QuestionFooterType = {
  currentQuestion: QuestionType;
};

export function QuestionsFooter({ currentQuestion }: QuestionFooterType) {
  const examSession = useExamSessionStore();
  const params = useParams();
  const router = useRouter();

  if (!examSession.session?.active) return <></>;

  if (!examSession.session || !examSession.exam) return;

  const selectedQuestions = examSession.session.questions.length;
  const totalQuestions = examSession.exam.questions.length;

  const percentage = (selectedQuestions / totalQuestions) * 100;

  const mobileBreakpoint = "sm";
  const isMobile = useMediaQuery(`(max-width: 48em)`);

  const hasPreviousQuestion =
    Math.min(...examSession.exam.questions.map((q) => q.number)) <
    currentQuestion.number;

  const hasNextQuestion =
    Math.max(...examSession.exam.questions.map((q) => q.number)) >
    currentQuestion.number;

  let nextQuestionURL = "";
  let previousQuestionURL = "";
  const questionsNumbers = examSession.exam.questions.map((q) => q.number);

  if (hasNextQuestion) {
    const nextQuestionNumber =
      questionsNumbers[questionsNumbers.indexOf(currentQuestion.number) + 1];

    nextQuestionURL = `/exams/${params.examId}/questions/${nextQuestionNumber}`;
  }

  if (hasPreviousQuestion) {
    const previousQuestionNumber =
      questionsNumbers[questionsNumbers.indexOf(currentQuestion.number) - 1];

    previousQuestionURL = `/exams/${params.examId}/questions/${previousQuestionNumber}`;
  }

  return (
    <Affix
      position={{ bottom: 0 }}
      style={{ boxShadow: "black 0px 5px 9px" }}
      w="100%"
      h={isMobile ? 120 : 80}
      px={30}
      bg="white"
    >
      <Flex align="center" direction="column" justify="center" h="100%">
        <Flex w="100%" justify="space-between" align="center">
          <Button
            disabled={!hasPreviousQuestion}
            visibleFrom={mobileBreakpoint}
            onClick={() => router.push(previousQuestionURL)}
          >
            Anterior
          </Button>
          <Flex
            gap={10}
            mb={isMobile ? 20 : undefined}
            align="center"
            justify="center"
            w={isMobile ? "100%" : undefined}
          >
            <Text>{percentage}%</Text>
            <Progress
              transitionDuration={500}
              value={percentage}
              w={isMobile ? "100%" : 300}
            />
            <Text>
              {selectedQuestions}/{totalQuestions}
            </Text>
          </Flex>
          <Button
            onClick={() => router.push(nextQuestionURL)}
            disabled={!hasNextQuestion}
            visibleFrom={mobileBreakpoint}
          >
            Próxima
          </Button>
        </Flex>
        <Flex hiddenFrom={mobileBreakpoint} w="100%" justify="space-between">
          <Button
            disabled={!hasPreviousQuestion}
            onClick={() => router.push(previousQuestionURL)}
          >
            Anterior
          </Button>
          <Button
            disabled={!hasNextQuestion}
            onClick={() => router.push(nextQuestionURL)}
          >
            Próxima
          </Button>
        </Flex>
      </Flex>
    </Affix>
  );
}
