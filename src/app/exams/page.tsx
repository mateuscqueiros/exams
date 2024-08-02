import { Card, Container, Title } from "@mantine/core";
import Link from "next/link";

export default function QuizSelectionPage() {
  return (
    <Container>
      <Card component={Link} href="/exams/react-1" withBorder>
        <Title order={2}>Teste de React</Title>
      </Card>
    </Container>
  );
}
