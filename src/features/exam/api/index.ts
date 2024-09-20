'use server'

import { allExams, examData } from "@/values";
import { ExamType } from "../exam.types";
import { createExams } from "../__mocks__/create";
import { createClient } from "@/lib/supabase/server";

export async function getExams(): Promise<ExamType[]> {
  return new Promise(async (resolve, reject) => {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("tre")
      .select(` id, slug, title, description, image, questions ( id, statement, alternatives ( id, label, sequence))
  `)
      .eq("id", 1);

    if (error) {
      reject(error)
    };
    resolve(data as ExamType[])
  })
  // return [examData, ...createExams({ quantity: 10, startId: 1 })];
}

export async function getExamById(examId: ExamType['id']) {
  return Promise.resolve(allExams.find(exam => exam.id === examId));
}
