export class Answer {
  constructor(public questionId: number, public answer: string) {}
}

export const defaultEmptyAnswer = new Answer(0, "");
