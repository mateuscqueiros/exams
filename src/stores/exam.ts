import { create } from "zustand";
import { ExamStatusType, ExamType, PreExamFormType, QuestionType } from '../features/exam'
import { allExams, examData } from "@/values";

export type ExamStatusStoreType = {
  updatePreForm: (data: PreExamFormType) => void,
  removeQuestion: (questionId: QuestionType['id']) => void;
  updateQuestion: (questionData: QuestionType) => void
  startExam: (examId: number) => void;
  data: ExamStatusType | undefined;
};

export const examStatusStoreDefaultData: ExamStatusType = {
  id: undefined,
  title: '',
  slug: '',
  questions: [],
  preForm: {
    name: '',
    information: ''
  }
}

export const useExamStatusStore = create<ExamStatusStoreType>((set) => ({
  data: {
    ...examData,
    preForm: {
      name: 'Mateus',
      information: 'asdfgadf'
    },
  },
  startExam: (examId: number) => set(state => {
    const newExam = allExams.find((exam) => exam.id === examId)
    if (newExam) return {
      ...state,
      exam: {
        ...newExam,
        id: examId,
        preForm: examStatusStoreDefaultData.preForm
      }
    }
    return state
  }),
  updatePreForm: (data: PreExamFormType) => set(state => ({
    ...state,
    preForm: data
  })),
  removeQuestion: (questionId: QuestionType['id']) => set(state => (state.data ? {
    ...state,
    questions: state.data.questions.filter(q => q.id === questionId)
  } : state)),
  updateQuestion: (questionData: QuestionType) => set((state) => {
    if (!state.data) return state
    const questionExists = state.data.questions.some(q => q.id === questionData.id)

    if (questionExists) {
      const otherQuestions = state.data.questions.filter(q => q.id === questionData.id);

      return {
        ...state,
        questions: [...otherQuestions, questionData]
      }
    }

    return {
      ...state,
      questions: [...state.data.questions, questionData]
    }
  })
}))
