"use client";
import { Alternative, QuestionsMenu } from "@/features/exam";
import { useExamSessionStore } from "@/stores/exam";
import {
  ActionIcon,
  Affix,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Progress,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCaretLeft, IconCaretRight } from "@tabler/icons-react";
import { notFound } from "next/navigation";
import { useState } from "react";

export default function QuestionPage({
  params: { questionId },
}: {
  params: { questionId: string };
}) {
  const currentExamSession = useExamSessionStore();

  if (!currentExamSession.session?.active) return notFound();

  const question = currentExamSession.exam?.questions.find(
    (q) => q.number === Number(questionId),
  );

  const [selected, setSelected] = useState(0);
  const [opened, { close, toggle }] = useDisclosure(false);

  return (
    <Box style={{ position: "relative" }}>
      <Container w="100%" miw={{ md: 800 }}>
        <ActionIcon
          onClick={toggle}
          style={{ position: "absolute", top: 0, right: 0 }}
        >
          {opened ? <IconCaretRight /> : <IconCaretLeft />}
        </ActionIcon>
        <QuestionsMenu opened={opened} close={close} />
        <Center mb={100}>
          <Flex direction="column">
            <Title order={4}>Questão 1</Title>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            </Text>
            <Divider my={20} />
            <Box>
              <Flex direction="column" gap={20}>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Alternative
                      name="alternative"
                      label={`Opção ${i}`}
                      checked={selected === i}
                      key={i}
                      value={i}
                      onSelect={(v) => setSelected(v)}
                    />
                  ))}
              </Flex>
            </Box>
          </Flex>
        </Center>
        <Affix
          position={{ bottom: 0 }}
          style={{ boxShadow: "black 0px 5px 9px" }}
          w="100%"
          h={80}
          px={30}
          bg="white"
        >
          <Flex w="100%" justify="space-between" align="center" h="100%">
            <Button>Anterior</Button>
            <Flex gap={10} align="center" justify="center">
              <Text>80%</Text>
              <Progress value={80} w={300} />
              <Text>25/30</Text>
            </Flex>

            <Button>Anterior</Button>
          </Flex>
        </Affix>
      </Container>
    </Box>
  );
}
