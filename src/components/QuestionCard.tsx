import Card from "@mui/material/Card";
import { useAppContext } from "./hooks/useAppContext";
import { IAnswer } from "./interfaces/IAnswer";
import { IQuestion } from "./interfaces/IQuestion";
import { Player } from "./models/Player";
import {
  CardActionArea,
  CardContent,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Colors } from "../styled/Variables/Colors";
import { breakpointTheme } from "../themes/themes";

const optionCardTheme = createTheme({
  components: {
    MuiCard: {
      defaultProps: {
        sx: {
          textAlign: "center",
          margin: 0,
          padding: 0,
          backgroundColor: "#eee0e49c",

          ":hover": {
            boxShadow: "inset 0 0 8px rgb(46, 45, 45)",
          },
        },
      },
    },
  },
});

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
      <ThemeProvider theme={breakpointTheme}>
        <Card
          key={`q-${question.id}-${question.answer}`}
          sx={{
            backgroundColor: Colors.primaryFrostyWhite,
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
            gap: "20px",
            width: {
              xxs: "90%",
              xs: "90%",
              sm: "60%",
              md: "40%",
              lg: "30%",
            },
            boxShadow: "5px 5px 10px 1px rgba(59, 47, 47, 0.7)",
          }}
        >
          <CardContent sx={{ margin: 0, padding: 0 }}>
            <Typography gutterBottom variant="h5" component="div">
              Fråga {question.id}
            </Typography>
            <Typography variant="body2" color="black">
              {question.question}
            </Typography>
          </CardContent>

          {question.options.map((opt, i) => (
            <ThemeProvider theme={optionCardTheme}>
              <Card key={`${opt}-ind-${i}`}>
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
            </ThemeProvider>
          ))}
        </Card>
      </ThemeProvider>
    </>
  );
};
