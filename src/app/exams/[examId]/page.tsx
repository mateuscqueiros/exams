"use client";

import { PreExamFormType, preExamSchema } from "@/features/exam";
import { useExamStatusStore } from "@/stores/exam";
import { examData } from "@/values";
import { Button, Container, Flex, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";

export default function PreExamPage() {
  const currentExamSession = useExamStatusStore();
  const examToDo = examData;

  const router = useRouter();
  const form = useForm<PreExamFormType>({
    initialValues: {
      name: "",
      information: "",
    },
    validate: zodResolver(preExamSchema),
  });

  const handleSubmit = (values: PreExamFormType) => {
    currentExamSession.startExam(0);
    currentExamSession.updatePreForm(values);
    router.push(
      `/exams/${examToDo.slug}/questions/${examToDo.questions.find((q) => q.number === 1)}`,
    );
  };

  return (
    <Container maw={500}>
      <h1>{examToDo.title}</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column" gap={20}>
          <TextInput label="Nome" required {...form.getInputProps("name")} />
          <Textarea
            rows={4}
            label="Informações"
            required
            {...form.getInputProps("information")}
          />
          <Flex justify="flex-end">
            <Button type="submit">Iniciar</Button>
          </Flex>
        </Flex>
      </form>
    </Container>
  );
}
