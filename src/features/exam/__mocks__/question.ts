import { AlternativeType, ExamType, QuestionType, SessionAnswerType, SessionType } from "../exam.types";
import { randCatchPhrase, randLine, randNumber, randParagraph } from '@ngneat/falso';
import { MockOptionsType } from "./__mock__.types";
import { alternativeIdentifiers } from "../utils";

export function createSessions(options?: MockOptionsType & { active?: boolean }): SessionType[] {
  return Array(options?.quantity || 1).fill(0).map((_, index) => {
    return {
      answers: createSessionAnswers({ quantity: 10 }),
      active: options?.active || false,
      preForm: undefined
    }
  })
}

export function createSessionAnswers(options?: MockOptionsType & {}): SessionAnswerType[] {
  return Array(options?.quantity || 1).fill(0).map((_, index) => {
    return {
      questionId: index,
      number: index + 1,
      alternativeId: randNumber({ min: 0, max: 4 })
    }
  })
}

export function createExams(options?: MockOptionsType): ExamType[] {
  return Array(options?.quantity || 1).fill(0).map((_, index) => {
    return {
      id: index,
      title: randCatchPhrase(),
      slug: 'mock-test-' + index,
      questions: createQuestions({ quantity: 10 })
    }
  })
}

export function createQuestions(options?: MockOptionsType): QuestionType[] {
  return Array(options?.quantity || 1).fill(0).map((_, index) => {
    return {
      id: index,
      number: index + 1,
      title: randLine(),
      description: randParagraph(),
      alternatives: createAlternatives()
    }
  })
}

export function createAlternatives(options?: MockOptionsType): AlternativeType[] {
  return Array(options?.quantity || 5).fill(0).map((_, index) => {
    return {
      id: index,
      label: randCatchPhrase(),
      sequence: index
    }
  })
}

export function createRandomMetaCode(options?: MockOptionsType & { examId?: number, questionsQuantity?: number }): string {
  const answers = Array(options?.questionsQuantity || 5).fill(0).map((_, index) => {
    return `${index + 1}-${alternativeIdentifiers[randNumber({ min: 0, max: 4 })].toLowerCase()}`
  }).join(',')
  return `ex:${options?.examId || 0};form:letter;ans:${answers};`
}
