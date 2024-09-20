import { createExams } from "../__mocks__/create";
import { allExams, examData } from "../__mocks__/values";
import { ExamType } from "../exam.types";

export async function getExams() {
  return [examData, ...createExams({ quantity: 10, startId: 1 })];
}

export async function getExamById(examId: ExamType['id']) {
  return Promise.resolve(allExams.find(exam => exam.id === examId));
}

