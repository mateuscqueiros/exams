'use client'

import { create } from "zustand";
import { ExamSessionType, ExamType, PreExamFormType, QuestionType } from '../features/exam'

export type ExamSessionStoreType = {
  updatePreForm: (values: PreExamFormType) => void,
  removeQuestion: (questionId: QuestionType['id']) => void;
  updateQuestion: (questionData: QuestionType) => void
  startSession: (examData: ExamType) => void;
  endSession: () => void;
  exam: ExamType | undefined;
  session: ExamSessionType | undefined;
};

export const examSessionStoreDefaultData: ExamSessionType = {
  questions: [],
  preForm: {
    name: '',
    information: ''
  }
}

export const useExamSessionStore = create<ExamSessionStoreType>((set) => ({
  session: examSessionStoreDefaultData,
  exam: undefined,
  startSession: (examData: ExamType) => set((state) => startSession(state, examData)),
  endSession: () => set(endSession),
  updatePreForm: (preFormData: PreExamFormType) => set((state) => updatePreForm(state, preFormData)),
  removeQuestion: (questionId: QuestionType['id']) => set(state => removeQuestion(state, questionId)),
  updateQuestion: (questionData: QuestionType) => set(state => updateQuestion(state, questionData))
}))

function updateQuestion(state: ExamSessionStoreType, questionData: QuestionType): ExamSessionStoreType {
  console.log('update question')
  if (!state.session) return state
  const questionExists = state.session.questions.some(q => q.id === questionData.id)

  if (questionExists) {
    const otherQuestions = state.session.questions.filter(q => q.id === questionData.id);

    return {
      ...state,
      session: {
        ...state.session,
        questions: [...otherQuestions, questionData]
      }
    }
  }

  return {
    ...state,
    session: {
      ...state.session,
      questions: [...state.session.questions, questionData]
    }
  }
}

function removeQuestion(state: ExamSessionStoreType, questionId: QuestionType['id']): ExamSessionStoreType {
  console.log('remove', state)
  return state.session !== undefined ? {
    ...state,
    session: {
      ...state.session,
      questions: state.session.questions.filter(q => q.id !== questionId)
    }
  } : state
}

function updatePreForm(state: ExamSessionStoreType, preFormData: PreExamFormType): ExamSessionStoreType {
  return state.session !== undefined ? {
    ...state,
    session: {
      ...state.session,
      preForm: preFormData
    }
  } : state

}

function startSession(state: ExamSessionStoreType, examData: ExamType): ExamSessionStoreType {
  console.log('start')
  return {
    ...state,
    exam: examData,
    session: {
      questions: [],
      preForm: examSessionStoreDefaultData.preForm
    }
  }
}

function endSession(state: ExamSessionStoreType): ExamSessionStoreType {
  return {
    ...state,
    exam: undefined,
    session: examSessionStoreDefaultData
  }
}
