import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
import { Answer } from "../models/Answer";
import { IAnswer } from "../interfaces/IAnswer";
import { QuestionCard } from "../QuestionCard";
import { Stepper } from "../Stepper";

export const QuestionPage = () => {
  const {
    questions,
    currentQuestionNumber,
    setCurrentQuestionNumber,
    currentPlayer,
    setCurrentPlayer,
  } = useAppContext();
  const [counter, setCounter] = useState(10);
  const navigate = useNavigate();

  const registerEmptyAnswer = useCallback(() => {
    const updatedAnswers: IAnswer[] = [
      ...currentPlayer.answers,
      new Answer(questions[currentQuestionNumber].id, ""),
    ];

    setCurrentPlayer({
      ...currentPlayer,
      answers: updatedAnswers,
    });
  }, [currentPlayer, setCurrentPlayer, questions, currentQuestionNumber]);

  const triggerNextQuestion = useCallback(() => {
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

    if (counter === 0) {
      registerEmptyAnswer();
      triggerNextQuestion();

      if (currentQuestionNumber === questions.length - 1) {
        triggerResultPage();
      }
    }

    return () => clearInterval(timer);
  }, [
    counter,
    setCurrentQuestionNumber,
    currentQuestionNumber,
    questions,
    navigate,
    triggerNextQuestion,
    registerEmptyAnswer,
    triggerResultPage,
  ]);

  return (
    <>
      <Stepper />
      {currentQuestionNumber <= questions.length - 1 ? (
        <div>
          <div>Tid kvar: {counter} sekunder</div>

          <QuestionCard
            triggerNewQuestion={() => {
              if (currentQuestionNumber === questions.length - 1) {
                triggerResultPage();
                return;
              }
              triggerNextQuestion();
            }}
            key={questions[currentQuestionNumber].id}
            question={questions[currentQuestionNumber]}
          ></QuestionCard>
        </div>
      ) : (
        <div>Något fel inträffade vid hämtning av frågor!</div>
      )}
    </>
  );
};
