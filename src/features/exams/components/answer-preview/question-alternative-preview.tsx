import { rightColor } from "@/utils/theme";
import {
  Avatar,
  Card,
  Flex,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { AlternativeType } from "../../exam.types";
import { alternativeIdentifiers } from "../../lib/utils";

export type QuestionAlternativeProps = {
  alternative: AlternativeType;
  isUserAnswer: boolean;
  isAnswer?: boolean;
  showAlternativeBody?: boolean;
};

export function QuestionAlternativePreview({
  alternative,
  isAnswer,
  isUserAnswer,
  showAlternativeBody = true,
}: QuestionAlternativeProps) {
  const theme = useMantineTheme();
  const scheme = useMantineColorScheme();
  const isDark = scheme.colorScheme === "dark";

  return (
    <Card
      p={8}
      mb={4}
      bd={isUserAnswer ? `1px solid ${theme.primaryColor}` : undefined}
      bg={isAnswer ? rightColor(isDark) : undefined}
      key={alternative.id}
      w={showAlternativeBody ? "100%" : "fit-content"}
    >
      <Flex align="center">
        <Avatar
          size="md"
          variant={isAnswer ? "filled" : undefined}
          color={
            isAnswer ? theme.colors[theme.primaryColor][5] : theme.primaryColor
          }
        >
          {alternativeIdentifiers[alternative.sequence]}
        </Avatar>
        {showAlternativeBody && (
          <Text ml={20} c={isDark ? undefined : "black"}>
            {alternative?.label}
          </Text>
        )}
      </Flex>
    </Card>
  );
}
