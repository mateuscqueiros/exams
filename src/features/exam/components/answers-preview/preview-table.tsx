import { Table } from "@mantine/core";
import {
  AnswerKeyType,
  QuestionType,
  SessionAnswerType,
} from "../../exam.types";
import { alternativeIdentifiers } from "../../utils";

export type AnswerPreviewTableProps = {
  questions: QuestionType[];
  userAnswers: SessionAnswerType[];
  answerKey?: AnswerKeyType[];
  showAnswers?: boolean;
};

export function AnswerPreviewTable({
  questions,
  userAnswers,
  answerKey,
  showAnswers = true,
}: AnswerPreviewTableProps) {
  const rows = userAnswers.map((userAnswer) => {
    const question = questions.find((q) => q.id === userAnswer.questionId);
    const selectedAlternative = question?.alternatives.find(
      (alt) => alt.id === userAnswer.alternativeId,
    );
    const alternativeIdOfAnswer = answerKey
      ? answerKey.find((ak) => ak.questionId === userAnswer.questionId)
          ?.alternativeId
      : undefined;
    const answerToQuestion =
      alternativeIdOfAnswer !== undefined && showAnswers
        ? question?.alternatives.find((alt) => alt.id === alternativeIdOfAnswer)
        : undefined;

    return (
      <Table.Tr key={question?.id}>
        <Table.Td>{userAnswer.number}</Table.Td>
        {selectedAlternative && (
          <Table.Td>
            {alternativeIdentifiers[selectedAlternative?.sequence]}
          </Table.Td>
        )}
        {answerKey && answerToQuestion && showAnswers && (
          <Table.Td>
            {alternativeIdentifiers[answerToQuestion?.sequence]}
          </Table.Td>
        )}
      </Table.Tr>
    );
  });

  return (
    <Table striped withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Questão</Table.Th>
          <Table.Th>Selecionada</Table.Th>
          {answerKey && showAnswers && <Table.Th>Resposta</Table.Th>}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
