import { useEffect, useState } from "react";
import "./App.css";
import { IQuestion } from "./components/interfaces/IQuestion";
import { Routing } from "./Routing";
import { fetchData } from "./components/services/DataServices";
import { AppContext } from "./components/contexts/AppContext";
import { defaultEmptyPlayer, Player } from "./components/models/Player";

function App() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
  const [currentPlayer, setCurrentPlayer] =
    useState<Player>(defaultEmptyPlayer);

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
    setCurrentQuestionNumber,
    currentQuestionNumber,
    currentPlayer,
    setCurrentPlayer,
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
