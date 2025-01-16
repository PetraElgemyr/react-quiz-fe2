import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import { HomePage } from "./components/pages/HomePage";
import { ResultPage } from "./components/pages/ResultPage";
import { QuestionPage } from "./components/pages/QuestionPage";
import { StartPage } from "./components/pages/StartPage";

export const Routing = () => {
  return (
    <Router basename="/">
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<StartPage />} />
        <Route path="/game" element={<QuestionPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};
