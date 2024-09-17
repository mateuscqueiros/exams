import { ExamSessionDataType } from "@/stores/exam";
import { Divider, Flex, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { AnswerKeyType, QuestionType } from "../../exam.types";
import { getMetaCode } from "../../lib";
import { getSelectedAnswer } from "../../utils";
import { AddAnswerKeyModal } from "../add-answer-key-modal";
import { MetaCodeModal } from "../metacode-modal";
import { AnswersPreviewBody } from "./preview-body";
import { AnswersPreviewHeader } from "./preview-header";
import {
  AnswerPreviewOptions,
  AnswersPreviewOptionsType,
} from "./preview-options";
import { AnswerPreviewTable } from "./preview-table";

export type AnswersPreview = {
  examSession: ExamSessionDataType;
  answerKey?: AnswerKeyType[];
};

export function AnswersPreview({
  examSession,
  answerKey: propAnswerKey,
}: AnswersPreview) {
  const isDesktop = useMediaQuery("(min-width: 48em)");
  const [metaCodeModalOpened, { open: metaOpen, close: metaClose }] =
    useDisclosure(false);
  const [addAnswerKeyModal, { open: answerOpen, close: answerClose }] =
    useDisclosure(false);
  const [metaCode, setMetaCode] = useState<string | null>(null);
  const [answerKey, setAnswerKey] = useState<AnswerKeyType[] | undefined>(
    propAnswerKey,
  );
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType | null>(
    null,
  );
  const [options, setOptions] = useState<AnswersPreviewOptionsType>({
    showTitle: true,
    showAlternativeBody: true,
    showAnswers: true,
    tableMode: false,
  });

  const selectedAlternative = selectedQuestion
    ? getSelectedAnswer(selectedQuestion, examSession)
    : undefined;

  const selectedQuestionAnswer =
    options.showAnswers && selectedQuestion && answerKey
      ? answerKey.find((ans) => ans.questionId === selectedQuestion.id)
      : undefined;

  return (
    <Flex direction={isDesktop ? "row" : "column"} justify="space-between">
      {!examSession.exam && <Text>Sem exames para mostrar</Text>}
      {examSession.exam && examSession.exam?.questions.length === 0 && (
        <Text>O exame não possui questões</Text>
      )}
      {examSession.exam && examSession.session && (
        <>
          <MetaCodeModal
            opened={metaCodeModalOpened}
            close={close}
            code={metaCode}
          />
          <AddAnswerKeyModal
            opened={addAnswerKeyModal}
            close={answerClose}
            onFinish={(value) => {
              setAnswerKey(value);
            }}
          />
          <Flex
            w={isDesktop ? "50%" : undefined}
            justify="center"
            align="center"
            gap={8}
            direction="column"
            h="100%"
          >
            <AnswerPreviewOptions
              options={options}
              setOptions={setOptions}
              hasAnswers={answerKey !== undefined}
              onExport={() => {
                const metaCode = getMetaCode(examSession);
                if (metaCode === undefined) return;
                setMetaCode(metaCode);
                open();
              }}
              onAddAnswer={() => {
                answerOpen();
                return;
              }}
            />
          </Flex>
          {!(Number(examSession.exam?.questions.length) > 0) && (
            <Text>O exame não possui questões</Text>
          )}
          {Number(examSession.exam?.questions.length) > 0 && (
            <Flex
              mt={isDesktop ? undefined : 50}
              direction="column"
              mih={700}
              w={isDesktop ? "50%" : undefined}
            >
              {options.tableMode && (
                <AnswerPreviewTable
                  questions={examSession.exam.questions}
                  userAnswers={examSession.session.answers}
                  answerKey={answerKey}
                  showAnswers={options.showAnswers}
                />
              )}
              {!options.tableMode && (
                <>
                  <AnswersPreviewHeader
                    selectedQuestion={selectedQuestion}
                    setSelectedQuestion={setSelectedQuestion}
                    examSession={examSession}
                  />
                  <Divider mt={30} mb={20} />
                  {selectedQuestion && selectedAlternative && (
                    <AnswersPreviewBody
                      options={options}
                      selectedAlternative={selectedAlternative}
                      selectedQuestion={selectedQuestion}
                      answer={selectedQuestionAnswer}
                    />
                  )}
                </>
              )}
            </Flex>
          )}
        </>
      )}
    </Flex>
  );
}
