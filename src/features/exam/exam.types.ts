import { z } from "zod";

export const parseSessionSchema = z.object({
  sessionCode: z.string({ message: "O código da sessão é obrigatório" }),
  answerKeyCode: z.string().optional(),
});

export type ParseSessionType = z.infer<typeof parseSessionSchema>

export const preExamSchema = z.object({
  name: z.string().min(2, "O nome precisa ter 2 ou mais caracteres"),
  information: z.string(),
});

export type PreExamFormType = z.infer<typeof preExamSchema>;

export type ExamType = {
  id: number | undefined
  title: string,
  questions: QuestionType[]
  slug: string
}

export type ExamSessionType = {
  preForm: PreExamFormType | undefined,
  answers: SessionAnswerType[]
  active: boolean
};

export type QuestionType = {
  id: number
  number: number
  title: string
  description: string
  alternatives: AlternativeType[]
}

export type SessionAnswerType = {
  questionId: number;
  number: number
  alternativeId: number;
}

export type AlternativeType = {
  label: string;
  id: number;
  sequence: number;
}

export type AnswerKeyType = {
  questionId: number;
  alternativeId: number;
}
