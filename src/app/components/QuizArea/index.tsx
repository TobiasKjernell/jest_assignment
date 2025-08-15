import { gameQuiz } from "@/data/data";
import { IQuizSet } from "@/interfaces/interfaces";
import { ReactElement } from "react";

interface IQuizArea {
    gameQuiz: IQuizSet[],
    step: number,
    answer: boolean,
    onClick: (s:number) => void 
}

const QuizArea = ({ answer, step, gameQuiz, onClick }: IQuizArea): ReactElement => {
    return (
        <>
            <h3 className="my-5 text-center">{gameQuiz[step].question}</h3>
            <ul className="flex flex-col gap-2 border-pink-300 border-t-1 border-b-1 bg-pink-800 h-1/2 justify-center px-3">
                {gameQuiz && gameQuiz[step].alternatives.map((item: string, index: number) =>
                    <li data-testid='alternative-item' className={`border border-pink-400  text-center flex items-center justify-center ${!answer ? 'idle' : index === gameQuiz[step].answer ? 'correct' : 'wrong'}`} key={index}>
                        <button disabled={answer} onClick={() => onClick(index)} className="cursor-pointer grow h-15">{item}</button>
                    </li>
                )}
            </ul>
        </>
    )
}

export default QuizArea;