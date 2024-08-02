"use client";

import {
  Button,
  Center,
  Drawer,
  Grid,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { useParams } from "next/navigation";

export type QuestionsMenuType = {
  opened: boolean;
  close: () => void;
};

export function QuestionsMenu({ opened, close }: QuestionsMenuType) {
  const params = useParams<{ testId: string; questionId: string }>();
  const theme = useMantineTheme();

  return (
    <Drawer
      zIndex={201}
      position="right"
      offset={8}
      radius="md"
      opened={opened}
      onClose={close}
      title="Questões"
    >
      <Text size="sm">30 questões pendentes</Text>
      <Grid mt={20} gutter={10}>
        {Array(33)
          .fill(0)
          .map((v, i) => {
            const a = [1, 4, 5, 10, 15, 18, 19, 21, 22, 25, 26, 27, 30];
            const isSelected = Number(params.questionId) === i;
            const isAnswered = a.includes(i);
            return (
              <Grid.Col span={2.4} key={i}>
                <Center>
                  <Button
                    radius="sm"
                    size="sm"
                    component={Link}
                    href={`/quiz/${params.testId}/questions/${i}`}
                    color={isAnswered ? "lime.4" : undefined}
                    variant={
                      isSelected ? "filled" : isAnswered ? "filled" : "subtle"
                    }
                  >
                    {i}
                  </Button>
                </Center>
              </Grid.Col>
            );
          })}
      </Grid>
    </Drawer>
  );
}
