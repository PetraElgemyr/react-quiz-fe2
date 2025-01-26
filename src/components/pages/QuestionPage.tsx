import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
import { QuestionCard } from "../QuestionCard";
import { Player } from "../models/Player";
import "../scss/questionPage.scss";
import Button from "@mui/material/Button";
import { Colors } from "../../styled/Variables/Colors";
import Box from "@mui/material/Box";

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
      triggerResultPage();
    }

    setCurrentQuestionNumber(currentQuestionNumber + 1);
    setCounter(10);
  }, [
    currentQuestionNumber,
    setCurrentQuestionNumber,
    setCounter,
    triggerResultPage,
    questions,
  ]);

  const revealCorrentAnswer = useCallback(() => {
    const answer = questions.find(
      (q) => q.id === currentQuestionNumber + 1
    )?.answer;
    console.log("rätt svar till frågan är: ", answer);

    return answer;
  }, [questions, currentQuestionNumber]);

  useEffect(() => {
    if (isTimerPaused) return;

    const timer = setInterval(() => {
      setCounter((previousSec) => (previousSec > 0 ? previousSec - 1 : 0));
    }, 1000);

    if (counter === 0) {
      setIsTimerPaused(true);
      setShowNextButton(true);
      revealCorrentAnswer();
    }

    return () => clearInterval(timer);
  }, [counter, revealCorrentAnswer, isTimerPaused]);

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
                  if (currentQuestionNumber === questions.length - 1) {
                    triggerResultPage();
                    return;
                  }
                  triggerNextQuestion();
                }}
                question={questions[currentQuestionNumber]}
                registerClickedAnswer={() => {
                  setShowNextButton(true);
                  setIsTimerPaused(true);
                }}
                isTimerPaused={isTimerPaused}
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
          <Button
            size="large"
            variant="contained"
            sx={{
              background: Colors.primaryGold,
              color: "black",
            }}
            onClick={() => triggerNextQuestion()}
          >
            Nästa
          </Button>
        )}
      </Box>
    </div>
  );
};
