import { Avatar, Box, Card, Flex, ScrollArea, Text } from "@mantine/core";
import { AlternativeType, QuestionType } from "../../exam.types";
import { QuestionBody } from "../question-body";
import { AnswersPreviewOptionsType } from "./preview-options";

export type AnswersPreviewBodyType = {
  selectedQuestion: QuestionType;
  selectedAnswer: AlternativeType;
  options: AnswersPreviewOptionsType;
};

export function AnswersPreviewBody({
  selectedQuestion,
  selectedAnswer,
  options,
}: AnswersPreviewBodyType) {
  const alternativeIdentifiers = ["A", "B", "C", "D", "E"];

  return (
    <Card p={0} withBorder w="100%">
      <ScrollArea p="lg" py={0} mah={510}>
        <Box my="lg">
          {!selectedQuestion && (
            <Text>Selecione uma alternativa para visualizar mais detalhes</Text>
          )}
          {selectedQuestion && (
            <QuestionBody
              question={selectedQuestion}
              showTitle={options.showTitle}
              alternatives={selectedQuestion.alternatives.map((alt) => {
                const isUserAnswer = selectedAnswer?.id === alt.id;
                const isAnswer = alt.id === 0;

                return (
                  <Card
                    p={8}
                    mb={4}
                    bd={isUserAnswer ? "1px solid blue.5" : undefined}
                    bg={isAnswer ? "lime.2" : undefined}
                    key={alt.id}
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
            />
          )}
        </Box>
      </ScrollArea>
    </Card>
  );
}
