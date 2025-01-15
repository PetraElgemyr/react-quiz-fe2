import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useAppContext } from "../hooks/useAppContext";
import { ChangeEvent, useEffect } from "react";
import { defaultEmptyPlayer } from "../models/Player";

export const StartPage = () => {
  const navigate = useNavigate();
  const { currentPlayer, setCurrentPlayer, setCurrentQuestionNumber } =
    useAppContext();

  useEffect(() => {
    setCurrentQuestionNumber(0);
    setCurrentPlayer(defaultEmptyPlayer);
  }, [setCurrentQuestionNumber, setCurrentPlayer]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPlayer({ ...currentPlayer, name: e.target.value });
  };

  return (
    <>
      <h3>Ange namn:</h3>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={handleNameChange}
      />
      <button onClick={() => navigate("/game")}>Kör!</button>
    </>
  );
};
