import { z } from "zod";

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
  preForm: PreExamFormType,
  questions: QuestionType[]
  active: boolean
};

export type QuestionType = {
  id: number
  number: number
  title: string
  description: string
  alternatives: AlternativeType[]
  selected: AlternativeType['id'] | undefined
}

export type AlternativeType = {
  label: string;
  id: number
}
