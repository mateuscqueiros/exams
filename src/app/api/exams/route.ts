import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

  const supabase = createClient()

  const { data, error } = await supabase
    .from("exams")
    .select(` id, slug, title, description, image, questions ( id, statement, alternatives ( id, label, sequence))
  `)
    .eq("id", 1);

  if (!error) return NextResponse.json(data)

  redirect('/exams')
}
