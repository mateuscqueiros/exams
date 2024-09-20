import { ExamType } from "@/features/exam";
import { Carousel as MantineCarousel } from "@mantine/carousel";
import { useMantineTheme } from "@mantine/core";
import { ReactElement } from "react";

export type CarouselProps<T = ExamType> = {
  keyProp?: keyof T;
  items: T[];
  render: (element: T) => ReactElement;
};

export function ExamCarousel({ items, render, keyProp = "id" }: CarouselProps) {
  console.log("i", items);
  const theme = useMantineTheme();
  return (
    <MantineCarousel
      styles={{
        control: {
          background: theme.primaryColor,
        },
      }}
      loop
      slideSize={{ base: "100%", sm: "50%", md: "25%" }}
      slideGap="sm"
      height={200}
      dragFree
      align="center"
      withIndicators
      withControls
    >
      {items.map((item) => (
        <MantineCarousel.Slide key={item[keyProp] as any}>
          {render(item)}
        </MantineCarousel.Slide>
      ))}
    </MantineCarousel>
  );
}
