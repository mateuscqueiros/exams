import { Box, Divider, Flex, Text, Title } from "@mantine/core";
import { ReactElement } from "react";
import { QuestionType } from "../exam.types";

export type QuestionBodyType = {
  question: QuestionType;
  alternatives: ReactElement[];
  showTitle?: boolean;
};

export function QuestionBody({
  question,
  alternatives,
  showTitle = true,
}: QuestionBodyType) {
  return (
    <Flex direction="column" w="100%">
      <Title order={4}>Questão {question.number}</Title>
      {showTitle && <Text>{question.title}</Text>} <Divider my={20} />
      <Box>
        <Flex direction="column" gap={20}>
          {alternatives}
        </Flex>
      </Box>
    </Flex>
  );
}
