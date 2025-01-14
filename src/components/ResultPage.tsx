import { useEffect } from "react";
import { useAppContext } from "./hooks/useAppContext";

export const ResultPage = () => {
  const { currentScore, questions, answers, setCurrentScore } = useAppContext();

  useEffect(() => {
    let scores = 0;
    questions.forEach((q, index) => {
      if (q.answer === answers[index].answer) {
        scores += 1;
      }
    });
    setCurrentScore(scores);
  }, [answers, currentScore, setCurrentScore, questions]);

  return (
    <>
      <h3>Ditt resultat:</h3>

      <p>
        Du fick {currentScore} rätt av {questions.length} möjliga!
      </p>
    </>
  );
};
