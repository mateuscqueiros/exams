import { Affix, Button, rem } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import classes from "./finish-button.module.css";

export function FinishButton() {
  const clipboard = useClipboard();
  const params = useParams<{ examId: string }>();
  return (
    <Affix position={{ bottom: 110, right: 20 }}>
      <Button
        component={Link}
        href={`/exams/${params.examId}/post`}
        className={classes.blob}
        variant="light"
        rightSection={
          <IconCheck style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        }
        radius="xl"
        size="md"
        styles={{
          root: { paddingRight: rem(14), height: rem(48) },
          section: { marginLeft: rem(22) },
        }}
        onClick={() =>
          clipboard.copy("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
        }
      >
        Finalizar teste
      </Button>
    </Affix>
  );
}
