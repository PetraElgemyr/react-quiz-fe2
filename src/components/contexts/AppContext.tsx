import { createContext } from "react";
import { IQuestion } from "../interfaces/IQuestion";
import { Player } from "../models/Player";

export type AppState = {
  questions: IQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
  currentQuestionNumber: number;
  setCurrentQuestionNumber: React.Dispatch<React.SetStateAction<number>>;

  currentPlayer: Player;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<Player>>;
};

export const AppContext = createContext<AppState>({} as AppState);
