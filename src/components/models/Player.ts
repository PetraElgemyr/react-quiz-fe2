import { IAnswer } from "../interfaces/IAnswer";

export class Player {
  constructor(
    public name: string,
    public score: number,
    public answers: IAnswer[]
  ) {}
}

export const defaultEmptyPlayer = new Player("", 0, []);
