import { Button, Flex, Modal, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { getExamById } from "../api";
import { AnswerKeyType } from "../exam.types";
import { readMetaCode } from "../lib";
import { parsedMetaCodeToAnswerKey } from "../utils";

export type AddAnswerKeyModalProps = {
  initialValue?: string;
  opened: boolean;
  close: () => void;
  onFinish?: (value: AnswerKeyType[]) => void;
};

export function AddAnswerKeyModal({
  initialValue,
  opened,
  close,
  onFinish,
}: AddAnswerKeyModalProps) {
  const form = useForm<{ answerMetaCode: string }>({
    initialValues: {
      answerMetaCode: initialValue || "",
    },
  });

  const handleSubmit = async (value: { answerMetaCode: string }) => {
    if (onFinish === undefined) {
      close();
      return;
    }
    const parsedMetaCode = readMetaCode(value.answerMetaCode);
    if (parsedMetaCode === undefined) {
      form.setFieldError("answerMetaCode", "Código inválido");
      return;
    }
    const examData = await getExamById(parsedMetaCode?.examId);
    if (examData === undefined) return;
    onFinish(parsedMetaCodeToAnswerKey(parsedMetaCode, examData));
    close();
  };

  return (
    <Modal opened={opened} onClose={close} title="Metacode">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text size="sm" mb="sm">
          Adicione um metacódigo para verificar sua sessão.
        </Text>
        <TextInput
          styles={{
            input: {
              fontFamily: "monospace",
            },
          }}
          required
          {...form.getInputProps("answerMetaCode")}
        />
        <Flex pt="sm" justify="flex-end">
          <Button type="submit">Adicionar</Button>
        </Flex>
      </form>
    </Modal>
  );
}
