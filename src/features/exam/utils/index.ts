import { MetaCodeProcessedType } from "../meta-code.types";
import { ExamType, AnswerKeyType, QuestionType, AlternativeType } from "../exam.types";
import { ExamSessionDataType, ExamSessionStoreType } from "@/stores/exam";
import { examData } from "@/values";

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

export function getSelectedAnswer(
  question: QuestionType,
  examSession: ExamSessionDataType,
): AlternativeType | undefined {
  const answerInSession = examSession.session?.answers.find(
    (q) => q.questionId === question.id,
  );

  if (!answerInSession) return;

  const selectedAlternative = question.alternatives.find(
    (alt) => alt.id === answerInSession.alternativeId,
  );

  return selectedAlternative;
}

export function populateSession(examSession: ExamSessionStoreType) {
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

  examSession.updateQuestion({
    questionId: 2,
    alternativeId: 1,
    number: 3,
  });

  examSession.updateQuestion({
    questionId: 3,
    alternativeId: 4,
    number: 4,
  });

  examSession.updateQuestion({
    questionId: 4,
    alternativeId: 0,
    number: 5,
  });
}

export const alternativeIdentifiers = ["A", "B", "C", "D", "E"];
