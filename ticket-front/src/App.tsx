import { ThemeProvider } from "./components/theme/theme-provider";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
