import { IResult } from "@/interfaces/interfaces";
import { ReactElement } from "react";

const Result = ({ rightAnswers, amountOfAnswers, onClick }: IResult): ReactElement => {
    return (
        <>
            <div data-testid='result' className="w-100 bg-pink-600 p-10 flex flex-col items-center mt-30">
                <p className="">{rightAnswers} of {amountOfAnswers} right answers!</p>
                <button className="bg-pink-400 text-pink-900 p-3 px-5 cursor-pointer hover:bg-pink-500 hover:text-pink-200" onClick={onClick}>Play again</button>
            </div>
        </>
    )
}

export default Result;