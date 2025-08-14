export interface IQuizSet {
    question:string,
    answer:number,
    alternatives: string[]
}

export interface IProgressBar {
    step: number,
    gameQuiz: IQuizSet[]
}

export interface IResult {
    rightAnswers: number,
    amountOfAnswers: number,
    onClick: () => void
}