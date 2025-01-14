import { useEffect, useState } from "react";
import "./App.css";
import { IQuestion } from "./components/interfaces/IQuestion";
import { Routing } from "./Routing";
import { fetchData } from "./components/services/DataServices";
import { AppContext } from "./components/contexts/AppContext";
import { IAnswer } from "./components/interfaces/IAnswer";

function App() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
  const [answers, setAnswers] = useState<IAnswer[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        if (data) setQuestions(data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    getData();
  }, []);

  const contextValue = {
    questions,
    setQuestions,
    currentScore,
    setCurrentScore,
    setCurrentQuestionNumber,
    currentQuestionNumber,
    answers,
    setAnswers,
  };
  return (
    <>
      <AppContext.Provider value={contextValue}>
        <Routing />{" "}
      </AppContext.Provider>
    </>
  );
}

export default App;
