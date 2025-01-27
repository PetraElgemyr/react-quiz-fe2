import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
import { QuestionCard } from "../QuestionCard";
import { Player } from "../models/Player";
import "../scss/questionPage.scss";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material";
import { ButtonTheme } from "../themes/ButtonTheme";

export const QuestionPage = () => {
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
      setIsTimerPaused(true);
      setShowNextButton(true);
      setShowCorrectAnswer(true);
    }

    return () => clearInterval(timer);
  }, [counter, isTimerPaused]);

  useEffect(() => {
    setIsTimerPaused(false);
  }, [currentQuestionNumber]);

  return (
    <div className="container">
      <p className="time-text">Tid kvar: {counter} sekunder ⏳</p>
      {currentQuestionNumber <= questions.length - 1 ? (
        questions.map((q, i) => {
          if (i === currentQuestionNumber) {
            return (
              <QuestionCard
                key={`${q.id}-${i}`}
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
          paddingTop: "5%",
        }}
      >
        {showNextButton && (
          <ThemeProvider theme={ButtonTheme}>
            <Button onClick={() => triggerNextQuestion()}>Nästa</Button>
          </ThemeProvider>
        )}
      </Box>
    </div>
  );
};
