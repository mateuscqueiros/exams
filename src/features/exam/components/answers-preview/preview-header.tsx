import { ExamSessionDataType, ExamSessionStoreType } from "@/stores/exam";
import { Button, Center, Grid } from "@mantine/core";
import { QuestionType } from "../../exam.types";

export type AnswersPreviewHeaderType = {
  examSession: ExamSessionDataType;
  selectedQuestion: QuestionType | null;
  setSelectedQuestion: (question: QuestionType | null) => void;
};

export function AnswersPreviewHeader({
  examSession,
  selectedQuestion,
  setSelectedQuestion,
}: AnswersPreviewHeaderType) {
  return (
    <Grid>
      {examSession.exam?.questions.map((question, i) => {
        return (
          <Grid.Col span={2.4} key={question.id}>
            <Center>
              <Button
                onClick={() =>
                  selectedQuestion?.id === question.id
                    ? setSelectedQuestion(null)
                    : setSelectedQuestion(question)
                }
                variant={
                  selectedQuestion?.number === i + 1 ? "filled" : "outline"
                }
                radius="sm"
                size="sm"
              >
                {i + 1}
              </Button>
            </Center>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
