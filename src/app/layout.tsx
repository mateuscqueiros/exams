import "@mantine/core/styles.css";

import { AppShell } from "@/components/layout";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import { Toaster } from "sonner";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

const theme = createTheme({
  cursorType: "pointer",
  other: {
    colors: {
      positive: "lime.4",
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AppShell>{children}</AppShell>
        </MantineProvider>
        <Toaster richColors position="bottom-left" style={{ bottom: 100 }} />
      </body>
    </html>
  );
}
