import { ExamType } from "@/features/exam";


export const examData: ExamType = {
  id: 0,
  title: 'Teste de React',
  slug: 'react-1',
  questions: [
    {
      id: 0,
      title: 'account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?',
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
