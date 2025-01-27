import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useAppContext } from "../hooks/useAppContext";
import { ChangeEvent, useEffect } from "react";
import { Player } from "../models/Player";
import { v4 as uuidv4 } from "uuid";
import { Answer } from "../models/Answer";
import { Button, ThemeProvider } from "@mui/material";
import { ButtonTheme } from "../themes/ButtonTheme";
import { TextFieldTheme } from "../themes/TextFieldTheme";

export const StartPage = () => {
  const navigate = useNavigate();
  const {
    currentPlayer,
    setCurrentPlayer,
    setCurrentQuestionNumber,
    questions,
  } = useAppContext();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPlayer({ ...currentPlayer, name: e.target.value });
  };

  const checkIfNameIsValid = () => {
    if (currentPlayer.name.length > 0) {
      return true;
    }
    return false;
  };

  const addNewPlayerToLS = () => {
    const oldPlayers: Player[] = JSON.parse(
      localStorage.getItem("players") ?? "[]"
    );

    if (!oldPlayers.find((p) => p.id === currentPlayer.id)) {
      const allPlayers = [...oldPlayers, currentPlayer];
      localStorage.setItem("players", JSON.stringify(allPlayers));
    }
  };

  useEffect(() => {
    setCurrentQuestionNumber(0);

    const emptyAnswers = questions.map((q) => new Answer(q.id, ""));
    setCurrentPlayer(new Player(uuidv4().toString(), "", 0, emptyAnswers));
  }, [setCurrentQuestionNumber, setCurrentPlayer, questions]);

  return (
    <>
      <h1>Quizdags!</h1>
      <h3>Är du smartaren än en ph-deltagare? Dags att ta reda på det!</h3>
      <h3>Ange namn:</h3>
      <ThemeProvider theme={TextFieldTheme}>
        <TextField
          label="Namn"
          helperText={
            currentPlayer.name.length < 1
              ? "Du måste ange ett namn med minst ett tecken"
              : ""
          }
          onChange={handleNameChange}
        />
      </ThemeProvider>
      <ThemeProvider theme={ButtonTheme}>
        <Button
          disabled={currentPlayer.name.length <= 0}
          onClick={() => {
            const isValid = checkIfNameIsValid();
            if (isValid) {
              addNewPlayerToLS();
              navigate("/game");
            }
          }}
        >
          Starta
        </Button>
      </ThemeProvider>
    </>
  );
};
