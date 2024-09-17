import { ExamSessionDataType } from "@/stores/exam";
import { MetaCodeProcessedType, ParsedAnswerType } from "../meta-code.types";
import { ExamType, SessionAnswerType } from "../exam.types";

export function getMetaCode(data: ExamSessionDataType): string | undefined {
  if (!data.exam || !data.session) return;
  const divider = ";";
  const questionDivider = ",";

  const examMeta = `ex:${data.exam.id}`;
  const formatMeta = `form:letter`;

  const labels = ['a', 'b', 'c', 'd', 'e']

  const questionsList = data.exam.questions.map(question => {
    const fallback = `${question.number}:nn`
    const answer = data.session?.answers.find(a => a.questionId === question.id)

    if (!answer) return fallback

    const alternative = question.alternatives.find(alt => alt.id === answer.alternativeId)

    if (!alternative) return fallback

    return question.number + "-" + labels[alternative?.sequence]
  })

  const questionsMeta = 'ans:' + questionsList.join(questionDivider) + divider;

  return [examMeta, formatMeta, questionsMeta].join(divider)
}

export function readMetaCode(metaCode: string): MetaCodeProcessedType | undefined {
  const labels = ['a', 'b', 'c', 'd', 'e']
  const allPairs = metaCode.split(";").map(p => p.trim()).filter(p => p)

  const getValue = (pairs: string[], key: string) => pairs.find(p => p.startsWith(key))?.split(':')[1].trim();

  const examId = Number(getValue(allPairs, 'ex'))

  const format = getValue(allPairs, 'form')

  const rawAnswers = getValue(allPairs, 'ans')
  const parsedAnswers: ParsedAnswerType[] | undefined = rawAnswers?.split(',').map(p => p.trim()).map(p => p.split('-')).map(p => ({ questionNumber: Number(p[0]), selectedAnswer: labels.indexOf(p[1]) }))

  if (parsedAnswers === undefined || format === undefined || examId === undefined) return;

  return {
    examId,
    format,
    parsedAnswers
  }
}

export function getSessionFromParsedMetaCode(parsedMetaCode: MetaCodeProcessedType, examData: ExamType): ExamSessionDataType | undefined {
  const answers: SessionAnswerType[] = parsedMetaCode.parsedAnswers.map(parsedAnswer => {
    const question = examData.questions.find(q => q.number === parsedAnswer.questionNumber)

    if (!question || !parsedAnswer) return;

    return {
      number: parsedAnswer.questionNumber,
      alternativeId: parsedAnswer.selectedAnswer,
      questionId: question?.id
    }
  }).filter(q => q !== undefined)

  return {
    exam: examData,
    session: {
      answers,
      active: false,
      preForm: undefined
    }
  };
}
