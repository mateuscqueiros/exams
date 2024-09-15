import { Avatar, Box, Card, Flex, ScrollArea, Text } from "@mantine/core";
import {
  AlternativeType,
  QuestionAnswerType,
  QuestionType,
} from "../../exam.types";
import { QuestionBody } from "../question-body";
import { AnswersPreviewOptionsType } from "./preview-options";

export type AnswersPreviewBodyType = {
  selectedQuestion: QuestionType;
  selectedAlternative: AlternativeType;
  options: AnswersPreviewOptionsType;
  answer?: QuestionAnswerType;
};

export function AnswersPreviewBody({
  selectedQuestion,
  selectedAlternative,
  options,
  answer,
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
                const isUserAnswer = selectedAlternative?.id === alt.id;
                const isAnswer = answer
                  ? answer?.alternativeId === alt.id
                  : undefined;

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
