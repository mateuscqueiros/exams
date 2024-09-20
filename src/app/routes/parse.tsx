"use client";
import {
  parseSessionSchema,
  ParseSessionType,
} from "@/features/exams/exam.types";
import { readMetaCode } from "@/features/exams/lib";
import {
  Button,
  Container,
  Flex,
  Group,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useNavigate } from "react-router-dom";

// ex:0;form:letter;ans:1-c,2-d;

export function ParseExamPage() {
  const navigate = useNavigate();

  const form = useForm<ParseSessionType>({
    initialValues: {
      sessionCode: "",
      answerKeyCode: "",
    },
    validate: zodResolver(parseSessionSchema),
  });

  const handleSubmit = (values: ParseSessionType) => {
    const isValidAnswerKeyCode =
      values.answerKeyCode?.length === 0
        ? false
        : readMetaCode(values.answerKeyCode || "") === undefined;
    if (isValidAnswerKeyCode) {
      form.setFieldError("answerKeyCode", "Código inválido");
      return;
    }
    if (readMetaCode(values.sessionCode) === undefined) {
      form.setFieldError("sessionCode", "Código inválido");
      return;
    }

    navigate(
      `/parse/results?session=${values.sessionCode}&answer=${values.answerKeyCode}`,
    );
  };

  return (
    <Container maw={500}>
      <Title order={1} mb={10}>
        Verificar uma sessão
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column" gap={20}>
          <TextInput
            styles={{
              input: {
                fontFamily: "monospace",
              },
            }}
            label="Código da sua sessão"
            required
            {...form.getInputProps("sessionCode")}
          />
          <TextInput
            styles={{
              input: {
                fontFamily: "monospace",
              },
            }}
            placeholder="Opcional"
            label="Gabarito"
            {...form.getInputProps("answerKeyCode")}
          />
          <Group justify="flex-end">
            <Button type="submit">Enviar</Button>
          </Group>
        </Flex>
      </form>
      {/*examSession && <AnswersPreview examSession={examSession} />*/}
    </Container>
  );
}
