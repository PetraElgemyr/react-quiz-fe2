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
  const { currentPlayer, setCurrentPlayer } = useAppContext();

  const registerAnswer = (clickedAnswer: string) => {
    const existingAnswer = currentPlayer.answers.find(
      (a) => a.questionId === question.id
    );

    let updatedAnswers: IAnswer[] = [];

    if (existingAnswer !== undefined) {
      updatedAnswers = currentPlayer.answers.map((a: IAnswer) => {
        if (a.questionId === question.id) {
          a.answer = clickedAnswer;
        }
        return a;
      });
    } else {
      updatedAnswers = [
        ...currentPlayer.answers,
        {
          questionId: question.id,
          answer: clickedAnswer,
        },
      ];
    }
    setCurrentPlayer({ ...currentPlayer, answers: updatedAnswers });
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
