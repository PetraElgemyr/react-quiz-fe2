import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ResultPage } from "./components/pages/ResultPage";
import { QuestionPage } from "./components/pages/QuestionPage";
import { StartPage } from "./components/pages/StartPage";

export const Routing = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game" element={<QuestionPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};
