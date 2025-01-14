import { useEffect } from "react";
import { useAppContext } from "./hooks/useAppContext";
import "./scss/resultPage.scss";
import { IQuestion } from "./interfaces/IQuestion";

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

  const returnCorrectAnswerClassName = (question: IQuestion, opt: string) => {
    const answerToQuestion = answers.find((a) => a.questionId === question.id);
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
        Du fick {currentScore} rätt av {questions.length} möjliga!
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
