import { Box, Card, ScrollArea, Text } from "@mantine/core";
import { AlternativeType, AnswerKeyType, QuestionType } from "../../exam.types";
import { QuestionBody } from "../question-body";
import { AnswersPreviewOptionsType } from "./preview-options";
import { QuestionAlternativePreview } from "./question-alternative-preview";

export type AnswersPreviewBodyType = {
  selectedQuestion: QuestionType;
  selectedAlternative: AlternativeType;
  options: AnswersPreviewOptionsType;
  answer?: AnswerKeyType;
};

export function AnswersPreviewBody({
  selectedQuestion,
  selectedAlternative,
  options,
  answer,
}: AnswersPreviewBodyType) {
  return (
    <Card p={0} withBorder w="100%">
      <ScrollArea p="lg" py={0} mah={550}>
        <Box my="lg">
          {!selectedQuestion && (
            <Text>Selecione uma alternativa para visualizar mais detalhes</Text>
          )}
          {selectedQuestion && (
            <QuestionBody
              question={selectedQuestion}
              showTitle={options.showTitle}
              alternativeDir={options.showAlternativeBody ? "column" : "row"}
              alternatives={selectedQuestion.alternatives.map((alt) => {
                const isUserAnswer = selectedAlternative?.id === alt.id;
                const isAnswer = answer?.alternativeId === alt.id;

                return (
                  <QuestionAlternativePreview
                    key={alt.id}
                    alternative={alt}
                    isUserAnswer={isUserAnswer}
                    isAnswer={isAnswer}
                    showAlternativeBody={options.showAlternativeBody}
                  />
                );
              })}
            />
          )}
        </Box>
      </ScrollArea>
    </Card>
  );
}
