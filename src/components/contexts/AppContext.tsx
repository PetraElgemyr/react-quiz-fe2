import { createContext } from "react";
import { IQuestion } from "../interfaces/IQuestion";

export type AppState = {
  questions: IQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
  currentScore: number;
};

export const AppContext = createContext<AppState>({} as AppState);
