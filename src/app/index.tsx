import { AppProvider } from "./provider";
import { AppRouter } from "./router";

import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

export const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};
