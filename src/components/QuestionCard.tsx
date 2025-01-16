import { useAppContext } from "./hooks/useAppContext";
import { IAnswer } from "./interfaces/IAnswer";
import { IQuestion } from "./interfaces/IQuestion";
import { Player } from "./models/Player";

interface IQuestionCardProps {
  question: IQuestion;
  triggerNewQuestion: () => void;
  updateCurrentPlayerInLS: (p: Player) => void;
}

export const QuestionCard = ({
  question,
  triggerNewQuestion,
  updateCurrentPlayerInLS,
}: IQuestionCardProps) => {
  const { questions, currentPlayer, setCurrentPlayer } = useAppContext();

  const updateScoreForCurrentPlayer = (currentNewAnswers: Player) => {
    let scores = 0;
    questions.forEach((q, index) => {
      if (q.answer === currentNewAnswers.answers[index]?.answer) {
        scores += 1;
      }
    });

    const updatedPlayerWithScores = { ...currentNewAnswers };
    if (currentNewAnswers.score !== scores) {
      updatedPlayerWithScores.score = scores;
    }
    return updatedPlayerWithScores;
  };

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
    const newCurrentPlayer = { ...currentPlayer, answers: updatedAnswers };
    const updatedCurrentToSave = updateScoreForCurrentPlayer(newCurrentPlayer);
    updateCurrentPlayerInLS(updatedCurrentToSave);
    setCurrentPlayer(updatedCurrentToSave);
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
