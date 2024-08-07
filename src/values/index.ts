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
      description: 'Lorem ipsum',
      alternatives: [
        {
          id: 0,
          label: 'Opção 0',
          sequence: 0
        },
        {
          id: 1,
          label: 'Opção 1',
          sequence: 1
        },
        {
          id: 2,
          label: 'Opção 2',
          sequence: 2
        },
        {
          id: 3,
          label: 'Opção 3',
          sequence: 3

        },
        {
          id: 4,
          label: 'Opção 4',
          sequence: 4

        },
      ]
    },

    {
      id: 1,
      title: 'O que é HTML?',
      number: 2,
      description: 'Lorem ipsum',
      alternatives: [
        {
          id: 0,
          label: 'Opção 0',
          sequence: 0
        },
        {
          id: 1,
          label: 'Opção 1',
          sequence: 1
        },
        {
          id: 2,
          label: 'Opção 2',
          sequence: 2
        },
        {
          id: 3,
          label: 'Opção 3',
          sequence: 3

        },
        {
          id: 4,
          label: 'Opção 4',
          sequence: 4

        },
      ]
    }
  ]
}

export const allExams: ExamType[] = [examData]
