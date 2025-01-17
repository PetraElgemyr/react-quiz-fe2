import Card from "@mui/material/Card";
import { useAppContext } from "./hooks/useAppContext";
import { IAnswer } from "./interfaces/IAnswer";
import { IQuestion } from "./interfaces/IQuestion";
import { Player } from "./models/Player";
import { CardActionArea, CardContent, Typography } from "@mui/material";

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
      <Card
        key={`q-${question.id}-${question.answer}`}
        sx={{ backgroundColor: "#e1bed04a", width: "85%" }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Fråga {question.id}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {question.question}
          </Typography>
        </CardContent>

        {question.options.map((opt, i) => (
          <>
            <Card
              key={`${opt}-ind-${i}`}
              sx={{ margin: "5% 10%", textAlign: "center" }}
            >
              <CardActionArea
                onClick={() => {
                  registerAnswer(opt);
                }}
              >
                <CardContent>
                  <Typography variant="body1">{opt}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </>
        ))}
      </Card>
    </>
  );
};
