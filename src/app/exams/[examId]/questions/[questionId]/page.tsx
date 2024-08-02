"use client";
import { Box, Center, Container, Flex, Title } from "@mantine/core";

export default function QuestionPage({
  params: { questionId },
}: {
  params: { questionId: string };
}) {
  return (
    <Container w="100%" miw={{ md: 800 }}>
      <Center>
        <Flex direction="column">
          <Title order={4}>Questão 1</Title>
          <Box></Box>
        </Flex>
      </Center>
    </Container>
  );
}
