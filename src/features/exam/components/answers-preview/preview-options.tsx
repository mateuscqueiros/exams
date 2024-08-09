import { Flex, Switch, Title } from "@mantine/core";
import { ReactElement } from "react";

export type AnswersPreviewOptionsComponentType = {
  options: AnswersPreviewOptionsType;
  setOptions: any;
  otherOptions: ReactElement;
};

export type AnswersPreviewOptionsType = {
  showTitle: boolean;
};

export function AnswerPreviewOptions({
  options,
  setOptions,
  otherOptions,
}: AnswersPreviewOptionsComponentType) {
  return (
    <Flex w="100%" justify="center">
      <Flex direction="column" gap="md" w={300}>
        <Title order={4}>Opções</Title>
        <Switch
          checked={options.showTitle}
          onChange={() =>
            setOptions((s: any) => ({ ...s, showTitle: !s.showTitle }))
          }
          label="Mostrar enunciado"
        />
        {otherOptions}
      </Flex>
    </Flex>
  );
}
