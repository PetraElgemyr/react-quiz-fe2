import Card from "@mui/material/Card";
import { useAppContext } from "./hooks/useAppContext";
import { IAnswer } from "./interfaces/IAnswer";
import { IQuestion } from "./interfaces/IQuestion";
import { Player } from "./models/Player";
import {
  CardActionArea,
  CardContent,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Colors } from "../styled/Variables/Colors";
import { Stepper } from "./Stepper";
import { QuestionOptionCardTheme } from "./themes/QuestionOptionCardTheme";

interface IQuestionCardProps {
  question: IQuestion;
  triggerNewQuestion: () => void;
  updateCurrentPlayerInLS: (p: Player) => void;
  registerClickedAnswer: () => void;
  isTimerPaused: boolean;
  showCorrectAnswer: boolean;
  setShowCorrectAnswer: (val: boolean) => void;
  selectedOpt: string;
  setSelectedOpt: (opt: string) => void;
}

export const QuestionCard = ({
  question,
  updateCurrentPlayerInLS,
  registerClickedAnswer,
  isTimerPaused,
  showCorrectAnswer,
  setShowCorrectAnswer,
  selectedOpt,
  setSelectedOpt,
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
    }
    const newCurrentPlayer: Player = {
      ...currentPlayer,
      answers: updatedAnswers,
    };
    const updatedCurrentToSave: Player =
      updateScoreForCurrentPlayer(newCurrentPlayer);
    updateCurrentPlayerInLS(updatedCurrentToSave);
    setCurrentPlayer(updatedCurrentToSave);
  };

  return (
    <>
      <Card
        key={`q-${question.id}-${question.question}-${question.answer}`}
        sx={{
          background: Colors.primaryGold,
          padding: {
            xxs: "10%",
            xs: "8%",
            sm: "6%",
            md: "5%",
            lg: "4%",
            xl: "3%",
          },
          display: "flex",
          flexDirection: "column",
          gap: {
            xxs: "15px",
            xs: "15px",
            sm: "15px",
            md: "17px",
            lg: "17px",
            xl: "20px",
          },
          width: {
            xxs: "90%",
            xs: "90%",
            sm: "60%",
            md: "40%",
            lg: "30%",
            xl: "30%",
          },
          boxShadow: "5px 5px 10px 1px rgba(59, 47, 47, 0.7)",
        }}
      >
        <CardContent sx={{ margin: 0, padding: 0 }}>
          <Typography
            gutterBottom
            variant="h6"
            color="black"
            fontFamily={"Georgia, serif"}
          >
            Fråga {question.id}
          </Typography>
          <Typography
            fontFamily={"Georgia, serif"}
            variant="body1"
            color="black"
          >
            {question.question}
          </Typography>
        </CardContent>
        {question.options.map((opt, i) => (
          <ThemeProvider theme={QuestionOptionCardTheme} key={`${opt}-${i}`}>
            <Card
              key={`${opt}-ind-${i}`}
              sx={{
                boxShadow: `${
                  selectedOpt === opt ? "inset 0 0 8px rgb(46, 45, 45)" : "none"
                }`,
                "&:hover": !isTimerPaused
                  ? {
                      boxShadow: "inset 0 0 8px rgb(46, 45, 45)",
                    }
                  : undefined,
                transition: "box-shadow 0.2s ease",
                backgroundColor: `${
                  showCorrectAnswer
                    ? opt === question.answer
                      ? Colors.primaryGreen
                      : selectedOpt === opt
                      ? Colors.red
                      : Colors.backgroundWhite
                    : Colors.backgroundWhite
                }`,
              }}
            >
              <CardActionArea
                onClick={() => {
                  if (!isTimerPaused && !showCorrectAnswer) {
                    setSelectedOpt(opt);
                    setShowCorrectAnswer(true);
                    registerClickedAnswer();
                    registerAnswer(opt);
                  }
                }}
              >
                <CardContent
                  sx={{
                    textAlign: "center",
                    padding: {
                      xxs: "5%",
                      xs: "4%",
                      sm: "3.5%",
                      md: "3.5%",
                      lg: "3%",
                      xl: "3%",
                    },
                  }}
                >
                  <Typography
                    color="black"
                    variant="body1"
                    fontFamily={"Georgia, serif"}
                  >
                    {opt}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </ThemeProvider>
        ))}
        <Stepper />
      </Card>
    </>
  );
};
