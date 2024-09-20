import { AlternativeType, SessionType, ExamType, QuestionType, SessionAnswerType } from "../exam.types";
import { randCatchPhrase, randLine, randNumber, randParagraph } from '@ngneat/falso';
import { MockOptionsType } from "./__mock__.types";
import { alternativeIdentifiers } from "../lib/utils";

export function createSessions(options?: MockOptionsType & { active?: boolean }): SessionType[] {
  const quantity = options?.quantity || 1;
  return Array(quantity).fill(0).map(() => {
    return {
      answers: createSessionAnswers({ quantity: 10 }),
      active: options?.active || false,
      preForm: undefined
    }
  })
}

export function createSessionAnswers(options?: MockOptionsType & {}): SessionAnswerType[] {
  const quantity = options?.quantity || 1;
  const startId = options?.startId || 0;
  return Array(quantity).fill(0).map((_, index) => {
    return {
      questionId: (startId) + index,
      number: (startId) + index + 1,
      alternativeId: randNumber({ min: 0, max: 4 })
    }
  })
}

export function createExams(options?: MockOptionsType): ExamType[] {
  const quantity = options?.quantity || 1;
  const startId = options?.startId || 0;
  return Array(quantity).fill(0).map((_, index) => {
    return {
      id: (startId) + index,
      title: randCatchPhrase(),
      slug: 'mock-test-' + (options?.startId || 0) + index,
      questions: createQuestions({ quantity: 10 }),
      image: '',
      description: randParagraph()
    }
  })
}

export function createQuestions(options?: MockOptionsType): QuestionType[] {
  return Array(options?.quantity || 1).fill(0).map((_, index) => {
    return {
      id: (options?.startId || 0) + index,
      number: (options?.startId || 0) + index + 1,
      statement: randLine(),
      description: randParagraph(),
      alternatives: createAlternatives()
    }
  })
}

export function createAlternatives(options?: MockOptionsType): AlternativeType[] {
  const quantity = options?.quantity || 1;
  const startId = options?.startId || 0;
  return Array(quantity).fill(0).map((_, index) => {
    return {
      id: (startId) + index,
      label: randCatchPhrase(),
      sequence: index
    }
  })
}

export function createRandomMetaCode(options?: MockOptionsType & { examId?: number, questionsQuantity?: number }): string {
  const startId = options?.startId || 0;
  const answers = Array(options?.questionsQuantity || 5).fill(0).map((_, index) => {
    return `${(startId) + index + 1}-${alternativeIdentifiers[randNumber({ min: 0, max: 4 })].toLowerCase()}`
  }).join(',')
  return `ex:${options?.examId || 0};form:letter;ans:${answers};`
}

