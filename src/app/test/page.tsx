import { Test } from "@/components/test";
import { createClient } from "@/lib/supabase/server";

export default async function DBTest() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("exams")
    .select(
      `
    id,
    slug,
    title,
    description,
    image,
    questions ( 
      id, 
      statement, 
      alternatives (
        id,
        label,
        sequence
      )
    )
  `,
    )
    .eq("id", 1);

  return <Test data={data} error={error} />;
}
