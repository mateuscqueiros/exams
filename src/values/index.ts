import { ExamType } from "@/features/exam";


export const examData: ExamType = {
  id: 0,
  title: 'Teste de React',
  slug: 'react-1',
  questions: [
    {
      id: 0,
      title: 'O que é HTML?',
      number: 1,
      selected: undefined,
      description: 'Lorem ipsum',
      alternatives: [
        {
          id: 0,
          label: 'Opção 0'
        },
        {
          id: 1,
          label: 'Opção 1'
        },
        {
          id: 2,
          label: 'Opção 2'
        },
        {
          id: 3,
          label: 'Opção 3'
        },
        {
          id: 0,
          label: 'Opção 4'
        },
      ]
    }
  ]
}

export const allExams: ExamType[] = [examData]
