import { Avatar, Card, Flex, Text } from "@mantine/core";
import { AlternativeType } from "../../exam.types";
import { alternativeIdentifiers } from "../../utils";

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
  return (
    <Card
      p={8}
      mb={4}
      bd={isUserAnswer ? "1px solid blue.5" : undefined}
      bg={isAnswer ? "lime.2" : undefined}
      key={alternative.id}
      w={showAlternativeBody ? "100%" : "fit-content"}
    >
      <Flex align="center">
        <Avatar size="md" color="blue">
          {alternativeIdentifiers[alternative.sequence]}
        </Avatar>
        {showAlternativeBody && <Text ml={20}>{alternative?.label}</Text>}
      </Flex>
    </Card>
  );
}
