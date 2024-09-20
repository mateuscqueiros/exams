"use client";

import { AppShell } from "@/components/layout";
import { ExamCard, ExamCarousel, PageSection } from "@/components/ui/home";
import { FeaturedExam } from "@/components/ui/home/feature-exam";
import { getExams } from "@/features/exams/api";
import { ExamType } from "@/features/exams/exam.types";
import { Container, Flex } from "@mantine/core";
import { useEffect, useState } from "react";

export function ExamSelectionPage() {
  const [exams, setExams] = useState<ExamType[]>([]);
  const featuredExam = exams.length > 0 ? exams[0] : undefined;

  useEffect(() => {
    getExams()
      .then((data) => setExams(data as ExamType[]))
      .catch((err) => console.log(err));
  }, []);

  const images = [
    "https://images.squarespace-cdn.com/content/v1/5511fc7ce4b0a3782aa9418b/1618442743734-PI4UBY9LX9EEGM2CHBU4/landscape-pastel-painting-by-Thaneeya-McArdle.jpg",
    "https://img.freepik.com/free-vector/hand-drawn-winter-landscape_23-2148772822.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1726531200&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/8-bit-graphics-pixels-scene-with-nature_23-2151120959.jpg?t=st=1726614288~exp=1726617888~hmac=98aea3ace3fad1674f98bdc3dcc139a7e449bb05abbcee30409a7e6202cc1807&w=740",
    "https://img.freepik.com/free-photo/natures-beauty-tranquil-forest-with-lake-generative-ai_188544-7835.jpg?size=626&ext=jpg&ga=GA1.1.43062969.1726613450&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/new-south-wales-oriole-oriolus-viridis-illustrated-by-elizabeth-gould_53876-65192.jpg?size=626&ext=jpg&ga=GA1.1.43062969.1726613450&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/holy-thistle-centaurea-benedicta-illustration-from-medical-botany-1836_53876-65066.jpg?size=626&ext=jpg&ga=GA1.1.43062969.1726613450&semt=ais_hybrid",
    "https://img.freepik.com/premium-photo/honeybee-haven-pencil-sketch_505557-51493.jpg?size=626&ext=jpg&ga=GA1.1.43062969.1726613450&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/digital-art-style-illustration-river-nature_23-2151825696.jpg?size=626&ext=jpg&ga=GA1.1.43062969.1726613450&semt=ais_hybrid",
  ];

  return (
    <Container>
      <Flex gap="xl" direction="column">
        {featuredExam && <FeaturedExam exam={featuredExam} />}
        <PageSection title="React">
          <ExamCarousel
            items={exams}
            render={(exam) => (
              <ExamCard
                title={exam.title}
                image={images[Math.floor(Math.random() * images.length)]}
              />
            )}
          />
        </PageSection>
        <PageSection title="HTML">
          <ExamCarousel
            items={exams}
            render={(exam) => (
              <ExamCard
                title={exam.title}
                image={images[Math.floor(Math.random() * images.length)]}
              />
            )}
          />
        </PageSection>
        <PageSection title="CSS">
          <ExamCarousel
            items={exams}
            render={(exam) => (
              <ExamCard
                title={exam.title}
                image={images[Math.floor(Math.random() * images.length)]}
              />
            )}
          />
        </PageSection>
        <PageSection title="Javascript">
          <ExamCarousel
            items={exams}
            render={(exam) => (
              <ExamCard
                title={exam.title}
                image={images[Math.floor(Math.random() * images.length)]}
              />
            )}
          />
        </PageSection>
      </Flex>
    </Container>
  );
}
