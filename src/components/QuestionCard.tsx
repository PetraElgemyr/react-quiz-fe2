import { useAppContext } from "./hooks/useAppContext";
import { IAnswer } from "./interfaces/IAnswer";
import { IQuestion } from "./interfaces/IQuestion";

interface IQuestionCardProps {
  question: IQuestion;
  triggerNewQuestion: () => void;
}

export const QuestionCard = ({
  question,
  triggerNewQuestion,
}: IQuestionCardProps) => {
  const { answers, setAnswers } = useAppContext();

  const registerAnswer = (clickedAnswer: string) => {
    const existingAnswer = answers.find((a) => a.questionId === question.id);

    let updatedAnswers: IAnswer[] = [];

    if (existingAnswer !== undefined) {
      updatedAnswers = answers.map((a: IAnswer) => {
        if (a.questionId === question.id) {
          a.answer = clickedAnswer;
        }
        return a;
      });
    } else {
      updatedAnswers = [
        ...answers,
        {
          questionId: question.id,
          answer: clickedAnswer,
        },
      ];
    }
    setAnswers([...updatedAnswers]);

    triggerNewQuestion();
  };

  return (
    <>
      <p>{question.question}</p>

      {question.options.map((opt, i) => (
        <button
          key={i}
          onClick={() => {
            registerAnswer(opt);
          }}
        >
          {opt}
        </button>
      ))}
    </>
  );
};
