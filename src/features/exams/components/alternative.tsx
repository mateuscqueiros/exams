import { Card, Radio, UnstyledButton, useMantineTheme } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export type AlternativeComponentType = {
  label: string;
  name: string;
  value: number;
  checked: boolean;
  onSelect: (v: number) => void;
};

export function Alternative({
  label,
  name,
  value,
  checked,
  onSelect,
}: AlternativeComponentType) {
  const theme = useMantineTheme();

  return (
    <UnstyledButton onClick={() => onSelect(value)}>
      <Card
        p="sm"
        style={{
          borderColor: checked ? theme.colors.lime[4] : undefined,
          borderWidth: 1,
        }}
        withBorder
      >
        <Radio
          size="md"
          // icon={icons[value]}
          icon={IconCheck}
          iconColor="dark.6"
          // color="teal.6"
          color="lime.4"
          label={label}
          name={name}
          value={value}
          checked={checked}
          onChange={() => onSelect(value)}
        />
      </Card>
    </UnstyledButton>
  );
}
