import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ResultPage } from "./components/pages/ResultPage";
import { Header } from "./components/Header";
import { MainPage } from "./components/pages/MainPage";

export const Routing = () => {
  return (
    <Router basename="/">
      <Header></Header>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};
