
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ThemeProvider } from "@/components/ThemeProvider";
import Layout from "./components/Layout";
import DifficultyCalculator from "./pages/DifficultyCalculator";
import PassCalculator from "./pages/PassCalculator";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./components/LanguageProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <DndProvider backend={HTML5Backend}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<DifficultyCalculator />} />
                  <Route path="difficulty" element={<DifficultyCalculator />} />
                  <Route path="pass" element={<PassCalculator />} />
                  <Route path="feedback" element={<Feedback />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </DndProvider>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
