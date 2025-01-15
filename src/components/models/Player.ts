import { IAnswer } from "../interfaces/IAnswer";
import { v4 as uuidv4 } from "uuid";

export class Player {
  constructor(
    public id: string,
    public name: string,
    public score: number,
    public answers: IAnswer[]
  ) {}
}

export const defaultEmptyPlayer = new Player(uuidv4().toString(), "", 0, []);
