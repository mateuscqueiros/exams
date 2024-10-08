import { rightColor, wrongColor } from "@/utils/theme";
import { Table, useMantineColorScheme } from "@mantine/core";
import {
  AnswerKeyType,
  QuestionType,
  SessionAnswerType,
} from "../../exam.types";
import { alternativeIdentifiers } from "../../lib/utils";

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
  const scheme = useMantineColorScheme();
  const isDark = scheme.colorScheme === "dark";

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
      <Table.Tr
        key={question?.id}
        bg={
          showAnswers && answerKey
            ? selectedAlternative?.id === answerToQuestion?.id
              ? rightColor(isDark)
              : wrongColor(isDark)
            : undefined
        }
      >
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
    <Table striped withColumnBorders={!showAnswers}>
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
