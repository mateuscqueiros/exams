import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Flex,
  Grid,
  ScrollArea,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { QuestionBody } from "./question-body";
import { ExamSessionStoreType } from "@/stores/exam";
import { useState } from "react";

export type AnswersPreview = {
  examSession: ExamSessionStoreType;
};

export function AnswerPreview({ examSession }: AnswersPreview) {
  const isDesktop = useMediaQuery("(min-width: 48em)");
  const [metaCodeModalOpened, { open, close }] = useDisclosure(false);
  const [metaCode, setMetaCode] = useState<string | null>(null);
  const [options, setOptions] = useState({
    showTitle: true,
  });
  return (
    <Flex direction={isDesktop ? "row" : "column"} justify="space-between">
      <Flex
        w={isDesktop ? "50%" : undefined}
        justify="center"
        align="center"
        gap={8}
        direction="column"
        h="100%"
      >
        <Flex w="100%" justify="center">
          <Flex direction="column" gap="md" w={300}>
            <Title order={4}>Opções</Title>
            <Switch
              checked={options.showTitle}
              onChange={() =>
                setOptions((s) => ({ ...s, showTitle: !s.showTitle }))
              }
              label="Mostrar enunciado"
            />
            <Button
              onClick={() => {
                const metaCode = getMetaCode(examSession);
                if (!metaCode) return;
                setMetaCode(metaCode);
                open();
              }}
            >
              Exportar
            </Button>

            <Button
              onClick={() =>
                readMetaCode("ex: 0; form: letter; ans: 1-c, 2-d;")
              }
            >
              Ler
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        mt={isDesktop ? undefined : 50}
        direction="column"
        mih={700}
        w={isDesktop ? "50%" : undefined}
      >
        <Grid>
          {examSession.exam?.questions.map((question, i) => {
            return (
              <Grid.Col span={2.4} key={question.id}>
                <Center>
                  <Button
                    onClick={() =>
                      selectedQuestion?.id === question.id
                        ? setSelectedQuestion(null)
                        : setSelectedQuestion(question)
                    }
                    variant={
                      selectedQuestion?.number === i + 1 ? "filled" : "outline"
                    }
                    radius="sm"
                    size="sm"
                  >
                    {i + 1}
                  </Button>
                </Center>
              </Grid.Col>
            );
          })}
        </Grid>
        <Divider mt={30} mb={20} />
        <Card p={0} withBorder w="100%">
          <ScrollArea p="lg" py={0} mah={510}>
            <Box my="lg">
              {!selectedQuestion && (
                <Text>
                  Selecione uma alternativa para visualizar mais detalhes
                </Text>
              )}
              {selectedQuestion && (
                <QuestionBody
                  question={selectedQuestion}
                  showTitle={options.showTitle}
                  alternatives={selectedQuestion.alternatives.map((alt) => {
                    const isUserAnswer = selectedAnswer?.id === alt.id;
                    const isAnswer = alt.id === 0;

                    return (
                      <Card
                        p={8}
                        mb={4}
                        bd={isUserAnswer ? "1px solid blue.5" : undefined}
                        bg={isAnswer ? "lime.2" : undefined}
                        key={alt.id}
                      >
                        <Flex align="center">
                          <Avatar size="md" color="blue">
                            {alternativeIdentifiers[alt.sequence]}
                          </Avatar>
                          <Text ml={20}>{alt?.label}</Text>
                        </Flex>
                      </Card>
                    );
                  })}
                />
              )}
            </Box>
          </ScrollArea>
        </Card>
      </Flex>
    </Flex>
  );
}
