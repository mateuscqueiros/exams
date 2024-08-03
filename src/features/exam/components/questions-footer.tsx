"use client";

import { useExamSessionStore } from "@/stores/exam";
import { Affix, Button, Flex, Progress, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export function QuestionsFooter() {
  const examSession = useExamSessionStore();
  if (!examSession.session?.active) return <></>;

  if (!examSession.session || !examSession.exam) return;

  const selectedQuestions = examSession.session.questions.length;
  const totalQuestions = examSession.exam.questions.length;
  console.log(selectedQuestions, totalQuestions);

  const percentage = (selectedQuestions / totalQuestions) * 100;
  const mobileBreakpoint = "sm";

  const isMobile = useMediaQuery(`(max-width: 48em)`);

  return (
    <Affix
      position={{ bottom: 0 }}
      style={{ boxShadow: "black 0px 5px 9px" }}
      w="100%"
      h={isMobile ? 120 : 80}
      px={30}
      bg="white"
    >
      <Flex align="center" direction="column" justify="center" h="100%">
        <Flex hiddenFrom={mobileBreakpoint} w="100%" justify="space-between">
          <Button>Anterior</Button>
          <Button>Próxima</Button>
        </Flex>
        <Flex w="100%" justify="space-between" align="center">
          <Button visibleFrom={mobileBreakpoint}>Anterior</Button>
          <Flex
            gap={10}
            mt={isMobile ? 20 : undefined}
            align="center"
            justify="center"
            w={isMobile ? "100%" : undefined}
          >
            <Text>{percentage}%</Text>
            <Progress value={percentage} w={isMobile ? "100%" : 300} />
            <Text>
              {selectedQuestions}/{totalQuestions}
            </Text>
          </Flex>
          <Button visibleFrom={mobileBreakpoint}>Próxima</Button>
        </Flex>
      </Flex>
    </Affix>
  );
}
