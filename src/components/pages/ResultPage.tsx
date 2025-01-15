import { useEffect } from "react";
import "../scss/resultPage.scss";
import { useAppContext } from "../hooks/useAppContext";
import { IQuestion } from "../interfaces/IQuestion";
import { Button } from "@mui/material";
import { Player } from "../models/Player";

export const ResultPage = () => {
  const { questions, currentPlayer, players, setPlayers } = useAppContext();

  useEffect(() => {
    const storagePlayers: Player[] = JSON.parse(
      localStorage.getItem("players") ?? "[]"
    );

    if (storagePlayers) {
      setPlayers(storagePlayers);
    }
  }, [currentPlayer, setPlayers]);

  const returnCorrectAnswerClassName = (question: IQuestion, opt: string) => {
    const answerToQuestion = currentPlayer.answers.find(
      (a) => a.questionId === question.id
    );
    let className = "";

    if (answerToQuestion && answerToQuestion.answer === opt) {
      className = "-choosen";
    }

    if (question.answer === opt) {
      className = className + "-correct";
    } else {
      className = className + "-incorrect";
    }

    return className;
  };

  const clearPlayersFromLS = () => {
    localStorage.setItem("players", "[]");
    setPlayers(JSON.parse(localStorage.getItem("players") ?? "[]"));
  };

  return (
    <>
      <h3>Ditt resultat:</h3>
      {players.find((p) => p.id === currentPlayer.id) && (
        <p>
          Du fick {currentPlayer.score} rätt av {questions.length} möjliga!
        </p>
      )}
      <Button onClick={clearPlayersFromLS}>Rensa rekord</Button>
      <h4>Rekord</h4>
      {players.length > 0 &&
        players.map((p, i) => (
          <div key={`${p.name}-${i}`}>
            <p>
              <span>
                {p.name} - {p.score} poäng
              </span>
            </p>
          </div>
        ))}
      {questions.map((q) => (
        <div key={q.id} className="question-card">
          <p>{q.question}</p>

          {q.options.map((opt) => (
            <p
              className={`option ${returnCorrectAnswerClassName(q, opt)} 
              `}
              key={opt}
            >
              {opt}
            </p>
          ))}
        </div>
      ))}
    </>
  );
};
