import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material";
import { useAppContext } from "./hooks/useAppContext";
import { Player } from "./models/Player";
import { QuestionCard } from "./QuestionCard";
import { ButtonTheme } from "./themes/ButtonTheme";
import "./scss/quizView.scss";
import { GoldenBallContainer } from "../styled/GoldenBallContainer";
import { StyledImg } from "../styled/Images";
import goldenBall from "../golden-ball.png";
import crackedGolden from "../cracked-golden.png";

export const QuizView = () => {
  const {
    questions,
    currentQuestionNumber,
    setCurrentQuestionNumber,
    setPlayers,
  } = useAppContext();
  const [counter, setCounter] = useState(10);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const [selectedOpt, setSelectedOpt] = useState<string>("");
  const navigate = useNavigate();

  const updateCurrentPlayerInLS = useCallback(
    (updatedCurrentPlayer: Player) => {
      const jsonPlayers: Player[] = JSON.parse(
        localStorage.getItem("players") ?? "[]"
      );

      const currentPlayerIndex = jsonPlayers.findIndex(
        (p) => p.id === updatedCurrentPlayer.id
      );

      jsonPlayers[currentPlayerIndex] = updatedCurrentPlayer;
      localStorage.setItem("players", JSON.stringify(jsonPlayers));
      setPlayers(jsonPlayers);
    },
    [setPlayers]
  );

  const triggerResultPage = useCallback(() => {
    navigate("/result");
  }, [navigate]);

  const triggerNextQuestion = useCallback(() => {
    if (currentQuestionNumber === questions.length - 1) {
      setShowNextButton(false);
      triggerResultPage();
      return;
    }

    setShowNextButton(false);
    setShowCorrectAnswer(false);
    setIsTimerPaused(false);
    setCurrentQuestionNumber(currentQuestionNumber + 1);
    setCounter(10);
  }, [
    currentQuestionNumber,
    setCurrentQuestionNumber,
    setCounter,
    triggerResultPage,
    questions,
  ]);

  useEffect(() => {
    if (isTimerPaused) return;

    const timer = setInterval(() => {
      setCounter((previousSec) => (previousSec > 0 ? previousSec - 1 : 0));
    }, 1000);

    if (counter === 0) {
      triggerNextQuestion();
    }

    return () => clearInterval(timer);
  }, [counter, isTimerPaused, triggerNextQuestion]);

  useEffect(() => {
    setIsTimerPaused(false);
  }, [currentQuestionNumber]);

  return (
    <div className="container">
      <GoldenBallContainer width="20%">
        <StyledImg
          src={!showNextButton && !isTimerPaused ? goldenBall : crackedGolden}
          alt="golden-ball"
        />
      </GoldenBallContainer>
      <p className="time-text">Tid kvar: {counter} sekunder ⏳</p>
      {currentQuestionNumber <= questions.length - 1 ? (
        questions.map((q, i) => {
          if (i === currentQuestionNumber) {
            return (
              <QuestionCard
                key={`quiz-QC-${q.id}-${q.answer}-i-${i}`}
                updateCurrentPlayerInLS={updateCurrentPlayerInLS}
                triggerNewQuestion={() => {
                  triggerNextQuestion();
                }}
                question={questions[currentQuestionNumber]}
                registerClickedAnswer={() => {
                  setShowNextButton(true);
                  setIsTimerPaused(true);
                }}
                isTimerPaused={isTimerPaused}
                showCorrectAnswer={showCorrectAnswer}
                setShowCorrectAnswer={(val: boolean) =>
                  setShowCorrectAnswer(val)
                }
                selectedOpt={selectedOpt}
                setSelectedOpt={(opt: string) => setSelectedOpt(opt)}
              ></QuestionCard>
            );
          }
        })
      ) : (
        <div>Något fel inträffade vid hämtning av frågor!</div>
      )}

      <Box
        sx={{
          width: {
            xxs: "90%",
            xs: "90%",
            sm: "60%",
            md: "40%",
            lg: "30%",
            xl: "30%",
          },
          display: "flex",
          justifyContent: "end",
          paddingTop: {
            xxs: "5%",
            xs: "5%",
            sm: "4%",
            md: "3%",
            lg: "2%",
            xl: "2%",
          },
        }}
      >
        {showNextButton && (
          <ThemeProvider theme={ButtonTheme}>
            <Button
              sx={{
                marginBottom: {
                  xxs: "20%",
                  xs: "20%",
                  sm: "10%",
                  md: "2%",
                  lg: "2%",
                  xl: "2%",
                },
              }}
              onClick={() => triggerNextQuestion()}
            >
              Nästa
            </Button>
          </ThemeProvider>
        )}
      </Box>
    </div>
  );
};
