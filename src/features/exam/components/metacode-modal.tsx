import {
  ActionIcon,
  Box,
  Code,
  CopyButton,
  Flex,
  Modal,
  rem,
  ScrollArea,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

export type MetaCodeModal = {
  opened: boolean;
  close: () => void;
  code: string | null;
};

export function MetaCodeModal({ opened, close, code }: MetaCodeModal) {
  return (
    <Modal opened={opened} onClose={close} title="Metacode">
      {!code && <Text>Nenhum código foi provido</Text>}
      {code && (
        <>
          <Text size="sm" mb="sm">
            O código a seguir pode ser usado para registrar informações sobre a
            sessão.
          </Text>
          <Flex style={{ position: "relative" }}>
            <ScrollArea maw="100%" w="100%">
              <Code miw="100%" block>
                <Text maw="100px" span style={{ whiteSpace: "nowrap" }}>
                  {code}
                </Text>
                <Box style={{ position: "absolute", top: 4, right: 4 }}>
                  <CopyButton value={code} timeout={2000}>
                    {({ copied, copy }) => (
                      <Tooltip
                        label={copied ? "Copiado" : "Copiar"}
                        withArrow
                        position="right"
                      >
                        <ActionIcon
                          color={copied ? "teal" : "gray"}
                          variant="subtle"
                          onClick={copy}
                        >
                          {copied ? (
                            <IconCheck style={{ width: rem(16) }} />
                          ) : (
                            <IconCopy style={{ width: rem(16) }} />
                          )}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                </Box>
              </Code>
            </ScrollArea>
          </Flex>
        </>
      )}
    </Modal>
  );
}
