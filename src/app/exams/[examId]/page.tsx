"use client";

import { PreExamFormType, preExamSchema } from "@/features/exam";
import { useExamSessionStore } from "@/stores/exam";
import { examData } from "@/values";
import { Button, Container, Flex, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PreExamPage() {
  const currentExamSession = useExamSessionStore();
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
    if (currentExamSession.session?.active) {
      toast.error(
        "Não é possível iniciar uma nova sessão enquanto houver uma sessão ativa",
      );
      return;
    }
    currentExamSession.startSession(examToDo);
    currentExamSession.updatePreForm(values);

    const firstQuestion = examToDo.questions.find((q) => q.number === 1);

    router.push(`/exams/${examToDo.slug}/questions/${firstQuestion?.number}`);
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
