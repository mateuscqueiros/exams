import { ExamSessionDataType, ExamSessionStoreType } from "@/stores/exam";
import { get } from "http";
import { AlternativeType, AnswerType } from "../exam.types";
import { MetaProcessType, ParsedAnswerType } from "../meta-code.types";

export function getMetaCode(data: ExamSessionDataType): string | undefined {
  if (!data.exam || !data.session) throw Error('Ocorreu um erro ao exportar os metadados')
  const divider = ";";
  const questionDivider = ",";

  const examMeta = `ex: ${data.exam.id}`;
  const formatMeta = `form: letter`;

  const labels = ['a', 'b', 'c', 'd', 'e']

  const questionsList = data.exam.questions.map(question => {
    const fallback = `${question.number}: nn`
    const answer = data.session?.answers.find(a => a.questionId === question.id)

    if (!answer) return fallback

    const alternative = question.alternatives.find(alt => alt.id === answer.alternativeId)

    if (!alternative) return fallback

    return question.number + "-" + labels[alternative?.sequence]
  })

  const questionsMeta = 'ans: ' + questionsList.join(questionDivider + " ") + divider;

  return [examMeta, formatMeta, questionsMeta].join(divider + " ")
}

export function readMetaCode(metaCode: string): MetaProcessType | undefined {
  const labels = ['a', 'b', 'c', 'd', 'e']
  const allPairs = metaCode.split(";").map(p => p.trim()).filter(p => p)

  const getValue = (pairs: string[], key: string) => pairs.find(p => p.startsWith(key))?.split(':')[1].trim();

  const examId = Number(getValue(allPairs, 'ex'))

  const format = getValue(allPairs, 'form')

  const rawAnswers = getValue(allPairs, 'ans')
  const parsedAnswers: ParsedAnswerType[] | undefined = rawAnswers?.split(',').map(p => p.trim()).map(p => p.split('-')).map(p => ({ questionNumber: Number(p[0]), selectedAnswer: labels.indexOf(p[1]) }))

  console.log({
    examId,
    format,
    parsedAnswers
  })

  if (parsedAnswers === undefined || format === undefined || examId === undefined) throw Error('Não foi possível processar os metadados')

  return {
    examId,
    format,
    parsedAnswers
  }
}
