import TextField from "@mui/material/TextField";
import { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, ThemeProvider } from "@mui/material";
import { ColCentered } from "../styled/Common/Common";
import {
  StartContainer,
  RegistrationContainer,
} from "../styled/StartContainer";
import { useAppContext } from "./hooks/useAppContext";
import { Answer } from "./models/Answer";
import { Player } from "./models/Player";
import { ButtonTheme } from "./themes/ButtonTheme";
import { TextFieldTheme } from "./themes/TextFieldTheme";
import goldenBall from "../golden-ball.png";
import "./scss/startView.scss";
import { GoldenBallContainer } from "../styled/GoldenBallContainer";
import { LogoImg } from "../styled/LogoImg";

interface IStartView {
  setShowStartView: (val: boolean) => void;
}

export const StartView = ({ setShowStartView }: IStartView) => {
  const {
    currentPlayer,
    setCurrentPlayer,
    setCurrentQuestionNumber,
    questions,
  } = useAppContext();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPlayer({ ...currentPlayer, name: e.target.value });
  };

  const checkIfNameIsValid = () => {
    if (currentPlayer.name.trim().length > 0) {
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

  const handleSubmit = () => {
    setIsSubmitted(true);
    const isValid = checkIfNameIsValid();
    if (isValid) {
      addNewPlayerToLS();
      setShowStartView(false);
    }
  };

  return (
    <>
      <ColCentered>
        <StartContainer>
          <h4 className="info-text">
            Har DU alla attribut och kunskaper som krävs för att medverka i en
            Paradise Hotel säsong? Är du smartare än en klassisk PH-deltagare?
            Dags att ta reda på det. Det har blivit dags för... frågeceremoni!🤗
          </h4>
          <GoldenBallContainer>
            <LogoImg src={goldenBall} alt="golden-ball" />
          </GoldenBallContainer>
          <h4 className="name-text">Ange namn:</h4>{" "}
        </StartContainer>

        <RegistrationContainer>
          <form
            className="name-form"
            autoComplete="off"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <ThemeProvider theme={TextFieldTheme}>
              <TextField
                fullWidth
                label="Namn"
                helperText={
                  currentPlayer.name.trim().length < 1 && isSubmitted
                    ? "Du måste ange ett namn med minst ett tecken"
                    : ""
                }
                onChange={handleNameChange}
              />
            </ThemeProvider>
            <ThemeProvider theme={ButtonTheme}>
              <Button type="submit" disabled={currentPlayer.name.length <= 0}>
                Starta
              </Button>
            </ThemeProvider>
          </form>
        </RegistrationContainer>
      </ColCentered>
    </>
  );
};
