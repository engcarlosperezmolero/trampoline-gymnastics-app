import Layout from "./components/Layout";
import DifficultyCalculator from "./pages/DifficultyCalculator";
import PassCalculator from "./pages/PassCalculator";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DifficultyCalculator />} />
        <Route path="difficulty" element={<DifficultyCalculator />} />
        <Route path="pass" element={<PassCalculator />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </>
);

export default App;
