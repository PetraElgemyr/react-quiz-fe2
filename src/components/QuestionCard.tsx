import { IQuestion } from "./interfaces/IQuestion";

interface IQuestionCardProps {
  question: IQuestion;
}

export const QuestionCard = ({ question }: IQuestionCardProps) => {
  return (
    <>
      <p>{question.question}</p>

      {question.options.map((opt, i) => (
        <span key={i}>{opt}</span>
      ))}
    </>
  );
};
