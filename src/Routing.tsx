import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QuestionPage } from "./components/QuestionPage";
import { StartPage } from "./components/StartPage";

export const Routing = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game" element={<QuestionPage />} />
      </Routes>
    </Router>
  );
};
