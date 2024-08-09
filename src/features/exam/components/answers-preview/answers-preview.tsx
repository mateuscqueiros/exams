import { ExamSessionDataType } from "@/stores/exam";
import { Button, Divider, Flex, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { AlternativeType, QuestionType } from "../../exam.types";
import { getMetaCode, readMetaCode } from "../../lib";
import { MetaCodeModal } from "../metacode-modal";
import { AnswersPreviewBody } from "./preview-body";
import { AnswersPreviewHeader } from "./preview-header";
import {
  AnswerPreviewOptions,
  AnswersPreviewOptionsType,
} from "./preview-options";

export type AnswersPreview = {
  examSession: ExamSessionDataType;
};

export function AnswersPreview({ examSession }: AnswersPreview) {
  const isDesktop = useMediaQuery("(min-width: 48em)");
  const [metaCodeModalOpened, { open, close }] = useDisclosure(false);
  const [metaCode, setMetaCode] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType | null>(
    null,
  );
  const [options, setOptions] = useState<AnswersPreviewOptionsType>({
    showTitle: true,
  });

  function getSelectedAnswer(
    question: QuestionType,
  ): AlternativeType | undefined {
    if (!examSession.session) return;

    const answerInSession = examSession.session.answers.find(
      (q) => q.questionId === question.id,
    );

    if (!answerInSession) return;

    const selectedAlternative = question.alternatives.find(
      (alt) => alt.id === answerInSession.alternativeId,
    );

    return selectedAlternative;
  }

  const selectedAnswer = selectedQuestion
    ? getSelectedAnswer(selectedQuestion)
    : undefined;

  return (
    <Flex direction={isDesktop ? "row" : "column"} justify="space-between">
      <MetaCodeModal
        opened={metaCodeModalOpened}
        close={close}
        code={metaCode}
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
          otherOptions={
            <>
              <Button
                onClick={() => {
                  try {
                    const metaCode = getMetaCode(examSession);
                    if (!metaCode) return;
                    setMetaCode(metaCode);
                    open();
                  } catch (err: any) {
                    toast.error(err.message);
                  }
                }}
              >
                Exportar
              </Button>

              <Button
                onClick={() =>
                  readMetaCode("ex: 0; form: letter; ans: 1-c, 2-d;")
                }
              >
                Ler
              </Button>
            </>
          }
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
          <AnswersPreviewHeader
            selectedQuestion={selectedQuestion}
            setSelectedQuestion={setSelectedQuestion}
            examSession={examSession}
          />
          <Divider mt={30} mb={20} />
          {selectedQuestion && selectedAnswer && (
            <AnswersPreviewBody
              options={options}
              selectedAnswer={selectedAnswer}
              selectedQuestion={selectedQuestion}
            />
          )}
        </Flex>
      )}
    </Flex>
  );
}
