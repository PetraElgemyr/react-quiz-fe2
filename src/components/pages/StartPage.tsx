import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useAppContext } from "../hooks/useAppContext";
import { ChangeEvent } from "react";
import { Player } from "../models/Player";

export const StartPage = () => {
  const navigate = useNavigate();
  const { currentPlayer, setCurrentPlayer } = useAppContext();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPlayer({ ...currentPlayer, name: e.target.value });
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

  return (
    <>
      <h3>Ange namn:</h3>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={handleNameChange}
      />
      <button
        onClick={() => {
          addNewPlayerToLS();
          navigate("/game");
        }}
      >
        Kör!
      </button>
    </>
  );
};
