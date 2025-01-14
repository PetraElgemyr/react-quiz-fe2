import { useCallback, useEffect, useState } from "react";
import { QuestionCard } from "./QuestionCard";
import { useAppContext } from "./hooks/useAppContext";
import { useNavigate } from "react-router-dom";

export const QuestionPage = () => {
  const {
    questions,
    currentQuestionNumber,
    setCurrentQuestionNumber,
    answers,
    currentScore,
    setCurrentScore,
    setAnswers,
  } = useAppContext();
  const [counter, setCounter] = useState(10);
  const navigate = useNavigate();

  const registerEmptyAnswer = useCallback(() => {
    setAnswers([
      ...answers,
      {
        questionId: questions[currentQuestionNumber].id,
        answer: "",
      },
    ]);
  }, [answers, setAnswers, questions, currentQuestionNumber]);

  const triggerNextQuestionWhenNoAnswer = useCallback(() => {
    setCurrentQuestionNumber(currentQuestionNumber + 1);
    setCounter(10);
  }, [currentQuestionNumber, setCurrentQuestionNumber, setCounter]);

  const triggerResultPage = useCallback(() => {
    navigate("/result");
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((previousSec) => (previousSec > 0 ? previousSec - 1 : 0));
    }, 1000);

    if (counter === 0 && currentQuestionNumber < questions.length - 1) {
      registerEmptyAnswer();
      triggerNextQuestionWhenNoAnswer();
    }
    if (currentQuestionNumber === questions.length - 1 && counter === 0) {
      triggerResultPage();
    }

    return () => clearInterval(timer);
  }, [
    counter,
    setCurrentQuestionNumber,
    currentQuestionNumber,
    answers,
    currentScore,
    questions,
    setCurrentScore,
    navigate,
    triggerNextQuestionWhenNoAnswer,
    registerEmptyAnswer,
    triggerResultPage,
  ]);

  return (
    <>
      {currentQuestionNumber <= questions.length - 1 ? (
        <div>
          <div>Tid kvar: {counter} sekunder</div>

          <QuestionCard
            triggerNewQuestion={() => {
              if (currentQuestionNumber === questions.length - 1) {
                triggerResultPage();
              }
              setCurrentQuestionNumber(currentQuestionNumber + 1);
              setCounter(10);
            }}
            key={questions[currentQuestionNumber].id}
            question={questions[currentQuestionNumber]}
          ></QuestionCard>
        </div>
      ) : (
        <div>Fel</div>
      )}
    </>
  );
};
