'use client'

import { create } from "zustand";
import { ExamSessionType, ExamType, PreExamFormType, QuestionType, SessionQuestionType } from '../features/exam'
import { toast } from "sonner";

export type ExamSessionStoreType = {
  updatePreForm: (values: PreExamFormType) => void,
  removeQuestion: (questionId: QuestionType['id']) => void;
  updateQuestion: (questionData: SessionQuestionType) => void
  startSession: (examData: ExamType) => void;
  endSession: () => void;
  exam: ExamType | undefined;
  session: ExamSessionType | undefined;
};

export const examSessionStoreDefaultData: ExamSessionType = {
  active: false,
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
  endSession: () => set((state) => endSession(state)),
  updatePreForm: (preFormData: PreExamFormType) => set((state) => updatePreForm(state, preFormData)),
  removeQuestion: (questionId: QuestionType['id']) => set(state => removeQuestion(state, questionId)),
  updateQuestion: (questionData: SessionQuestionType) => set(state => updateQuestion(state, questionData))
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

function updateQuestion(state: ExamSessionStoreType, questionData: SessionQuestionType): ExamSessionStoreType {
  if (!state.session) return state

  const questionExists = state.session.questions.some(q => q.questionId === questionData.questionId)
  toast.success('Resposta salva')

  if (questionExists) {
    const otherQuestions = state.session.questions.filter(q => q.questionId !== questionData.questionId);

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
  if (state.session?.active) {
    toast.error('Impossível iniciar, uma sessão já está ativa')
    return state
  }

  toast.info(`Sessão para ${examData.title} iniciada`)
  return {
    ...state,
    exam: examData,
    session: {
      questions: [],
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
