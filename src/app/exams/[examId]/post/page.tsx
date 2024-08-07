"use client";

import { AlternativeType, QuestionType } from "@/features/exam";
import { useExamSessionStore } from "@/stores/exam";
import { examData } from "@/values";
import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Container,
  Flex,
  Grid,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { useState } from "react";

export default function PostExam() {
  const theme = useMantineTheme();
  const examSession = useExamSessionStore();
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType | null>(
    null,
  );

  console.log(examSession);

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

  function getSelectedAnswer(
    question: QuestionType,
  ): AlternativeType | undefined {
    if (!examSession.session) return;

    console.log("questão", question);

    const answerInSession = examSession.session.answers.find(
      (q) => q.questionId === question.id,
    );

    if (!answerInSession) return;

    const selectedAlternative = question.alternatives.find(
      (alt) => alt.id === answerInSession.alternativeId,
    );

    console.log("na seção", answerInSession);

    return selectedAlternative;
  }

  const selectedAnswer = selectedQuestion
    ? getSelectedAnswer(selectedQuestion)
    : undefined;

  const alternativeIdentifiers = ["A", "B", "C", "D", "E"];

  return (
    <Container>
      <Flex direction="column" justify="space-between">
        <Box>
          <Flex justify="center" align="center" gap={8}>
            <IconCircleCheck color={theme.colors.lime[6]} /> Seu exame está
            salvo localmente.
          </Flex>
        </Box>
        <Grid mt={50}>
          {examSession.exam?.questions.map((question, i) => {
            return (
              <>
                <Grid.Col span={2.4} key={i}>
                  <Center>
                    <Button
                      onClick={() => setSelectedQuestion(question)}
                      variant={
                        selectedQuestion?.number === i + 1
                          ? "filled"
                          : "outline"
                      }
                      radius="sm"
                      size="sm"
                    >
                      {i + 1}
                    </Button>
                  </Center>
                </Grid.Col>
              </>
            );
          })}
          <Card withBorder mt={20} w="100%">
            {!selectedQuestion && (
              <Text>
                Selecione uma alternativa para visualizar mais detalhes
              </Text>
            )}
            {selectedQuestion && (
              <>
                <Text fw={700} fz={18} mb={20}>
                  Questão {selectedQuestion.number}
                </Text>
                <Flex direction="column">
                  {selectedQuestion.alternatives.map((alt) => {
                    const isUserAnswer = selectedAnswer?.id === alt.id;
                    const isAnswer = alt.id === 0;

                    return (
                      <Card
                        p={8}
                        mb={4}
                        bd={isUserAnswer ? "1px solid blue.5" : undefined}
                        bg={isAnswer ? "lime.2" : undefined}
                      >
                        <Flex align="center">
                          <Avatar size="md" color="blue">
                            {alternativeIdentifiers[alt.sequence]}
                          </Avatar>
                          <Text ml={20}>{alt?.label}</Text>
                        </Flex>
                      </Card>
                    );
                  })}
                </Flex>
              </>
            )}
          </Card>
        </Grid>
      </Flex>
    </Container>
  );
}
