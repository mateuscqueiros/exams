import { MetaCodeProcessedType } from "../meta-code.types";
import { ExamType, AnswerKeyType } from "../exam.types";

export const parsedMetaCodeToAnswerKey = (parsedMetaCode: MetaCodeProcessedType, examData: ExamType): AnswerKeyType[] =>
  parsedMetaCode.parsedAnswers
    .map((pq) => {
      const question = examData.questions.find(
        (q) => q.number === pq.questionNumber,
      );
      if (!question) return;

      return {
        questionId: question?.id,
        alternativeId: pq.selectedAnswer,
      };
    })
    .filter((q) => q !== undefined);

export const alternativeIdentifiers = ["A", "B", "C", "D", "E"];
