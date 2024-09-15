import { allExams } from "@/values";
import { ExamType } from "../exam.types";

export async function getExams() {
  return allExams;
}

export async function getExamById(examId: ExamType['id']) {
  return Promise.resolve(allExams.find(exam => exam.id === examId));
}
