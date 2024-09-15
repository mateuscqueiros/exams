"use client";
import {
  AnswersPreview,
  ExamType,
  getSessionFromParsedMetaCode,
  readMetaCode,
} from "@/features/exam";
import { getExamById } from "@/features/exam/api";
import { parsedMetaCodeToAnswerKey } from "@/features/exam/utils";
import { ExamSessionDataType } from "@/stores/exam";
import { Container } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ParseResultsPage() {
  const searchParams = useSearchParams();
  const [currentSession, setCurrentSession] = useState<
    ExamSessionDataType | undefined
  >();
  const [examData, setExamData] = useState<ExamType | undefined>();

  const sessionMetaCodeParam = searchParams.get("session");
  const answerMetaCodeParam = searchParams.get("answer");

  /* Parse answers (gabarito) from params */
  const parsedAnswerMetaCode =
    answerMetaCodeParam && readMetaCode(answerMetaCodeParam);
  const answerKey =
    parsedAnswerMetaCode && examData
      ? parsedMetaCodeToAnswerKey(parsedAnswerMetaCode, examData)
      : undefined;

  /* Parse user answer from params */
  const parsedSessionMetaCode =
    sessionMetaCodeParam && readMetaCode(sessionMetaCodeParam);
  const sessionUserAnswers =
    parsedSessionMetaCode && examData
      ? getSessionFromParsedMetaCode(parsedSessionMetaCode, examData)
      : undefined;

  useEffect(() => {
    /* Get exam data */
    if (parsedSessionMetaCode)
      getExamById(parsedSessionMetaCode.examId).then((res) => setExamData(res));

    /* Create session from meta code */
    if (parsedSessionMetaCode && examData)
      setCurrentSession(
        getSessionFromParsedMetaCode(parsedSessionMetaCode, examData),
      );
  }, [examData, sessionMetaCodeParam, answerMetaCodeParam]);

  console.log(currentSession);

  if (!sessionMetaCodeParam) return "Metacódigo da sessão não encontrado";

  return (
    <Container maw={1200}>
      {currentSession && (
        <AnswersPreview answerKey={answerKey} examSession={currentSession} />
      )}
    </Container>
  );
}
