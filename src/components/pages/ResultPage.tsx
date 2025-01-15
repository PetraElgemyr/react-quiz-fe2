import { useEffect } from "react";
import "../scss/resultPage.scss";
import { useAppContext } from "../hooks/useAppContext";
import { IQuestion } from "../interfaces/IQuestion";

export const ResultPage = () => {
  const { questions, currentPlayer, setCurrentPlayer } = useAppContext();

  useEffect(() => {
    let scores = 0;
    questions.forEach((q, index) => {
      if (q.answer === currentPlayer.answers[index].answer) {
        scores += 1;
      }
    });
    setCurrentPlayer({ ...currentPlayer, score: scores });
  }, [currentPlayer, setCurrentPlayer, questions]);

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

  return (
    <>
      <h3>Ditt resultat:</h3>

      <p>
        Du fick {currentPlayer.score} rätt av {questions.length} möjliga!
      </p>

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
