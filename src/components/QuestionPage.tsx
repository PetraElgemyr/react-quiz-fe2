import { useEffect, useState } from "react";
import { IQuestion } from "./interfaces/IQuestion";
import { fetchData } from "./services/DataServices";
import { QuestionCard } from "./QuestionCard";

export const QuestionPage = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
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
