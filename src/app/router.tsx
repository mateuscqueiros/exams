import { AppShell } from "@/components/layout";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      element: <AppShell />,
      children: [
        {
          path: "/exams",
          lazy: async () => {
            const { ExamSelectionPage } = await import("./routes/exams");
            return { Component: ExamSelectionPage };
          },
        },
        {
          path: "/parse",
          lazy: async () => {
            const { ParseExamPage } = await import("./routes/parse");
            return { Component: ParseExamPage };
          },
        },
      ],
    },
  ]);
export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
