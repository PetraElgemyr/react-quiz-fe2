import { useAppContext } from "./hooks/useAppContext";
import { IAnswer } from "./interfaces/IAnswer";
import { IQuestion } from "./interfaces/IQuestion";
import { Player } from "./models/Player";

interface IQuestionCardProps {
  question: IQuestion;
  triggerNewQuestion: () => void;
}

export const QuestionCard = ({
  question,
  triggerNewQuestion,
}: IQuestionCardProps) => {
  const { questions, currentPlayer, setCurrentPlayer, setPlayers } =
    useAppContext();

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

  const updateAnswerInLS = (updatedCurrentToSave: Player) => {
    const jsonPlayers: Player[] = JSON.parse(
      localStorage.getItem("players") ?? "[]"
    );
    const currentPlayerIndex = jsonPlayers.findIndex(
      (p) => p.id === updatedCurrentToSave.id
    );

    jsonPlayers[currentPlayerIndex] = updatedCurrentToSave;
    localStorage.setItem("players", JSON.stringify(jsonPlayers));
    setPlayers(jsonPlayers);
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
    updateAnswerInLS(updatedCurrentToSave);
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
