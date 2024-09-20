import { ExamType } from "@/features/exams/exam.types";
import {
  Card,
  Image,
  Paper,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { PageSection } from "./page-section";
import { Link } from "react-router-dom";

export type FeaturedExamProps = {
  exam: ExamType;
};

export function FeaturedExam({ exam }: FeaturedExamProps) {
  const scheme = useMantineColorScheme();
  const isDarkMode = scheme.colorScheme === "dark";

  const isMobile = useMediaQuery(`(max-width: 48em)`);

  if (isMobile) return <FeaturedExamMobile exam={exam} />;

  return (
    <PageSection title="Em destaque">
      <Card h={300} withBorder>
        {exam.image && (
          <Card.Section
            component={Link}
            to={`/exams/${exam.slug}`}
            p={0}
            style={{ shadow: "1px solid" }}
          >
            <Image h={300} pos="absolute" src={exam.image} />
          </Card.Section>
        )}
        <Paper
          p="sm"
          pos="absolute"
          bottom={20}
          left={20}
          maw={400}
          bg={isDarkMode ? "rgba(0, 0, 0, .75)" : "rgba(255, 255, 255, .75)"}
        >
          <Title order={3} mb={10}>
            {exam.title}
          </Title>
          <Text lineClamp={3} size="sm">
            {exam.description}
          </Text>
        </Paper>
      </Card>
    </PageSection>
  );
}

export function FeaturedExamMobile({ exam }: FeaturedExamProps) {
  return (
    <PageSection title="Em destaque">
      <Card component={Link} href={`/exams/${exam.slug}`} withBorder>
        {exam.image && (
          <Card.Section p={0} style={{ shadow: "1px solid" }}>
            <Image mah={300} src={exam.image} />
          </Card.Section>
        )}
        <Card.Section p="sm">
          <Title order={3} mb={10}>
            {exam.title}
          </Title>
          <Text size="sm" lineClamp={7}>
            {exam.description}
          </Text>
        </Card.Section>
      </Card>
    </PageSection>
  );
}
