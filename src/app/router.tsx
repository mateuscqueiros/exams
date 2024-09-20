import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/exams",
      lazy: async () => {
        const { ExamSelectionPage } = await import("./routes/exams");
        return { Component: ExamSelectionPage };
      },
    },
  ]);
export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
