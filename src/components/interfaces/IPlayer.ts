import { IAnswer } from "./IAnswer";

export interface IPlayer {
  name: string;
  score: number;
  answers: IAnswer[];
}
