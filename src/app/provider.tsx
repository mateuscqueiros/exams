import { MainErrorFallback } from "@/components/errors/main";
import { AppShell } from "@/components/layout";
import { queryConfig } from "@/lib/react-query";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { LoadingSpinner } from "../components/ui/spinner";

type AppProviderProps = React.PropsWithChildren;

const theme = createTheme({
  cursorType: "pointer",
  primaryColor: "orange",
  other: {
    colors: {
      positive: "lime.4",
    },
  },
});

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {import.meta.env.DEV && <ReactQueryDevtools />}
            <Toaster />
            <MantineProvider
              withGlobalClasses
              defaultColorScheme="light"
              theme={theme}
            >
              {children}
            </MantineProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
