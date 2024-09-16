export type MetaCodeProcessedType = {
  examId: number;
  format: string;
  parsedAnswers: ParsedAnswerType[]
}

export type ParsedAnswerType = {
  questionNumber: number;
  selectedAnswer: number;
}

