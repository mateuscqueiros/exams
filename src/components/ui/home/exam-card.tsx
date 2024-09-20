import { Card, Image, Text } from "@mantine/core";

export type ExamCardProps = {
  title: string;
  image: string;
};

export function ExamCard({ title, image }: ExamCardProps) {
  return (
    <Card h="100%" withBorder pos="relative">
      <Card.Section>
        <Image
          src={image}
          height={100}
          alt={`Imagem para teste ${title}`}
          fit="cover"
          top={0}
          left={0}
        />
      </Card.Section>
      <Card.Section p="xs">
        <Text fw={500}>{title}</Text>
      </Card.Section>
    </Card>
  );
}
