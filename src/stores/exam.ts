'use client'

import { create } from "zustand";
import { ExamSessionType, ExamType, PreExamFormType, QuestionType, SessionAnswerType } from '../features/exam'
import { toast } from "sonner";

export type ExamSessionStoreType = {
  updatePreForm: (values: PreExamFormType) => void,
  removeQuestion: (questionId: QuestionType['id']) => void;
  updateQuestion: (questionData: SessionAnswerType) => void
  startSession: (examData: ExamType) => void;
  endSession: () => void;
} & ExamSessionDataType;

export type ExamSessionDataType = {
  exam: ExamType | undefined;
  session: ExamSessionType | undefined;
}

export const examSessionStoreDefaultData: ExamSessionType = {
  active: false,
  answers: [],
  preForm: {
    name: '',
    information: ''
  }
}

export const useExamSessionStore = create<ExamSessionStoreType>((set) => ({
  session: examSessionStoreDefaultData,
  exam: undefined,
  startSession: (examData: ExamType) => set((state) => startSession(state, examData)),
  endSession: () => set((state) => endSession(state)),
  updatePreForm: (preFormData: PreExamFormType) => set((state) => updatePreForm(state, preFormData)),
  removeQuestion: (questionId: QuestionType['id']) => set(state => removeQuestion(state, questionId)),
  updateQuestion: (questionData: SessionAnswerType) => set(state => updateQuestion(state, questionData))
}))

// export const useExamSessionStore = create(persist<ExamSessionStoreType>((set) => ({
//   session: examSessionStoreDefaultData,
//   exam: undefined,
//   startSession: (examData: ExamType) => set((state) => startSession(state, examData)),
//   endSession: () => set((state) => endSession(state)),
//   updatePreForm: (preFormData: PreExamFormType) => set((state) => updatePreForm(state, preFormData)),
//   removeQuestion: (questionId: QuestionType['id']) => set(state => removeQuestion(state, questionId)),
//   updateQuestion: (questionData: QuestionType) => set(state => updateQuestion(state, questionData))
// }), {
//   // name: 'exam-session-storage',
//   name: 'exam-session-storage',
// }))

function updateQuestion(state: ExamSessionStoreType, questionData: SessionAnswerType): ExamSessionStoreType {
  if (!state.session) return state

  const questionExists = state.session.answers.some(q => q.questionId === questionData.questionId)
  toast.success('Resposta salva')

  if (questionExists) {
    const otherQuestions = state.session.answers.filter(q => q.questionId !== questionData.questionId);

    return {
      ...state,
      session: {
        ...state.session,
        answers: [...otherQuestions, questionData]
      }
    }
  }

  return {
    ...state,
    session: {
      ...state.session,
      answers: [...state.session.answers, questionData]
    }
  }
}

function removeQuestion(state: ExamSessionStoreType, questionNumber: QuestionType['number']): ExamSessionStoreType {
  return state.session !== undefined ? {
    ...state,
    session: {
      ...state.session,
      answers: state.session.answers.filter(q => q.number !== questionNumber)
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
  if (state.session?.active) {
    toast.error('Impossível iniciar, uma sessão já está ativa')
    return state
  }

  toast.info(`Sessão para ${examData.title} iniciada`)
  return {
    ...state,
    exam: examData,
    session: {
      answers: [],
      preForm: examSessionStoreDefaultData.preForm,
      active: true,
    }
  }
}

function endSession(state: ExamSessionStoreType): ExamSessionStoreType {
  if (!state.session?.active) {
    toast.warning(`Nenhuma sessão ativa, impossível finalizar`)
    return state
  }

  toast.success(`Sessão ${state.exam?.title} finalizada`)

  return {
    ...state,
    exam: undefined,
    session: examSessionStoreDefaultData,
  }
}
