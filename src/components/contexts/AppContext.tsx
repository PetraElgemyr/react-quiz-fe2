import { createContext } from "react";
import { IQuestion } from "../interfaces/IQuestion";
import { IAnswer } from "../interfaces/IAnswer";

export type AppState = {
  questions: IQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
  currentScore: number;
  setCurrentScore: React.Dispatch<React.SetStateAction<number>>;
  currentQuestionNumber: number;
  setCurrentQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
  answers: IAnswer[];
  setAnswers: React.Dispatch<React.SetStateAction<IAnswer[]>>;
};

export const AppContext = createContext<AppState>({} as AppState);
