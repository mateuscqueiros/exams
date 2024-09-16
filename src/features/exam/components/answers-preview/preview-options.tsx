import { Checkbox, Flex, Switch, SwitchProps, Title } from "@mantine/core";
import { ReactElement } from "react";

export type AnswersPreviewOptionsProps = {
  options: AnswersPreviewOptionsType;
  setOptions: any;
  otherOptions: ReactElement;
};

export type AnswersPreviewOptionsType = {
  showTitle: boolean;
  showAlternativeBody: boolean;
  showAnswers: boolean;
  tableMode: boolean;
};

function OptionSwitch({
  options,
  setOptions,
  optionKey,
  label,
  ...rest
}: {
  options: AnswersPreviewOptionsType;
  setOptions: (value: AnswersPreviewOptionsType) => void;
  optionKey: keyof AnswersPreviewOptionsType;
  label: string;
} & SwitchProps) {
  let result: AnswersPreviewOptionsType = { ...options };
  result[optionKey] = !result[optionKey];
  return (
    <Switch
      checked={options[optionKey]}
      onChange={() =>
        setOptions({
          ...options,
          ...result,
        })
      }
      label={label}
      {...rest}
    />
  );
}

export function AnswerPreviewOptions({
  options,
  setOptions,
  otherOptions,
}: AnswersPreviewOptionsProps) {
  return (
    <Flex w="100%" justify="center">
      <Flex direction="column" gap="md" w={300}>
        <Title order={4}>Opções</Title>
        <Checkbox
          checked={options.tableMode}
          onChange={() =>
            setOptions({ ...options, tableMode: !options.tableMode })
          }
          label="Ver em forma de tabela"
        ></Checkbox>
        <OptionSwitch
          optionKey="showAnswers"
          label="Mostrar respostas"
          options={options}
          setOptions={setOptions}
        />
        <OptionSwitch
          optionKey="showTitle"
          label="Mostrar enunciado"
          options={options}
          setOptions={setOptions}
          disabled={options.tableMode}
        />
        <OptionSwitch
          optionKey="showAlternativeBody"
          label="Mostrar alternativas"
          options={options}
          setOptions={setOptions}
          disabled={options.tableMode}
        />
        {otherOptions}
      </Flex>
    </Flex>
  );
}
