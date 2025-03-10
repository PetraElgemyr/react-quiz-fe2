import { useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Player } from "../models/Player";
import { useNavigate } from "react-router-dom";
import { HighScoreList } from "../HighScoreList";
import { Colors } from "../../styled/Variables/Colors";
import { AnswersContainer } from "../../styled/AnswersContainer";
import { IAnswer } from "../interfaces/IAnswer";
import { ColCentered } from "../../styled/Common/Common";
import { ButtonTheme } from "../themes/ButtonTheme";
import { ResultPageButtonContainer } from "../../styled/ResultPageButtonContainer";
import { CurrentResultHeadline, ResultText } from "../../styled/Headline";
import { QuestionOptionCardTheme } from "../themes/QuestionOptionCardTheme";

export const ResultPage = () => {
  const { questions, currentPlayer, players, setPlayers } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const storagePlayers: Player[] = JSON.parse(
      localStorage.getItem("players") ?? "[]"
    );

    if (storagePlayers.length >= 1) {
      setPlayers(storagePlayers);
    }
  }, [currentPlayer, setPlayers]);

  const clearPlayersFromLS = () => {
    localStorage.setItem("players", "[]");
    setPlayers(JSON.parse(localStorage.getItem("players") ?? "[]"));
  };

  const getAnswerForQuestion = (questionId: number) => {
    const question = currentPlayer.answers.find(
      (a: IAnswer) => a.questionId === questionId
    );

    if (question) {
      return question;
    }
  };

  return (
    <>
      <ColCentered>
        <ThemeProvider theme={ButtonTheme}>
          <ResultPageButtonContainer>
            <Button onClick={clearPlayersFromLS}>Rensa</Button>
            <Button onClick={() => navigate("/")}>{`${
              currentPlayer.answers.length > 0 ? "Spela igen" : "Spela"
            }`}</Button>
          </ResultPageButtonContainer>
        </ThemeProvider>
        <HighScoreList />
        {currentPlayer.answers.length > 0 && (
          <>
            <CurrentResultHeadline>Ditt resultat:</CurrentResultHeadline>
            {players.find((p) => p.id === currentPlayer.id) && (
              <ResultText>
                Du fick {currentPlayer.score} rätt av {questions.length}{" "}
                möjliga!
              </ResultText>
            )}
          </>
        )}
      </ColCentered>

      {currentPlayer.answers.length > 0 && (
        <AnswersContainer>
          {questions.map((q, i) => (
            <Card
              key={`result-QC-${q.id}-${i}`}
              sx={{
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
                justifyContent: "center",
                width: {
                  xxs: "90%",
                  xs: "80%",
                  sm: "40%",
                  md: "28%",
                  lg: "24%",
                  xl: "20%",
                },
                background: Colors.primaryGold,
                boxShadow: "5px 5px 10px 1px rgba(59, 47, 47, 0.7)",
              }}
            >
              <CardContent sx={{ margin: 0, padding: 0 }}>
                <Typography
                  variant="body1"
                  color="black"
                  fontFamily={"Georgia, serif"}
                >
                  {q.question}
                </Typography>
              </CardContent>

              {q.options.map((opt, i) => (
                <ThemeProvider
                  theme={QuestionOptionCardTheme}
                  key={`result-tp-${opt}-${i}`}
                >
                  <Card
                    key={`result-opt-card-${opt}-${i}`}
                    sx={{
                      padding: 0,
                      margin: 0,
                      textAlign: "center",
                      boxShadow: `${
                        getAnswerForQuestion(q.id)?.answer === opt
                          ? "inset 0 0 8px rgb(46, 45, 45)"
                          : "none"
                      }`,
                      backgroundColor: `${
                        opt === q.answer
                          ? Colors.primaryGreen
                          : getAnswerForQuestion(q.id)?.answer === opt
                          ? Colors.red
                          : Colors.backgroundWhite
                      }`,
                    }}
                  >
                    <CardActionArea>
                      <CardContent
                        sx={{
                          textAlign: "center",
                          padding: {
                            xxs: "5%",
                            xs: "4%",
                            sm: "3.5%",
                            md: "3%",
                            lg: "3%",
                            xl: "2%",
                          },
                        }}
                      >
                        <Typography
                          fontFamily={"Georgia, serif"}
                          color="black"
                          variant="body1"
                        >
                          {opt}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </ThemeProvider>
              ))}
            </Card>
          ))}
        </AnswersContainer>
      )}
    </>
  );
};
