import { IQuizSet } from "@/interfaces/interfaces";
import { ReactElement } from "react";

interface INextBtn {
    answer: boolean,
    step: number,
    gameQuiz: IQuizSet[],
    onClick: () => void
}

const NextBtn = ({ answer, step, gameQuiz, onClick }: INextBtn): ReactElement => {
    return (
        <div className="flex justify-end m-2">
            <button className="disabled:cursor-not-allowed cursor-pointer disabled:bg-pink-950 disabled:text-pink-200 bg-pink-400 text-pink-900 p-3 px-5 justify-self-end" disabled={!answer} onClick={onClick}>{step === gameQuiz.length - 1 ? 'See result' : 'Next'}</button>
        </div>
    )
}

export default NextBtn;