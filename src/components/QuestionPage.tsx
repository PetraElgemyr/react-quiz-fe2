import { useEffect, useState } from "react";
import { QuestionCard } from "./QuestionCard";
import { useAppContext } from "./hooks/useAppContext";

export const QuestionPage = () => {
  const { questions } = useAppContext();

  const [counter, setCounter] = useState(10);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((previousSec) => (previousSec > 0 ? previousSec - 1 : 0));
    }, 1000);

    if (counter === 0) {
      setCurrentQuestion(currentQuestion + 1);
      setCounter(10);
    }
    return () => clearInterval(timer);
  }, [counter, currentQuestion]);

  return (
    <>
      <div>Tid kvar: {counter} sekunder</div>
      <div>
        {questions.map((q) => (
          <QuestionCard key={q.id} question={q}></QuestionCard>
        ))}
      </div>
    </>
  );
};
