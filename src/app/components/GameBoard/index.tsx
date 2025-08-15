import { gameQuiz } from "@/data/data";
import { ReactElement, useState } from "react";
import ProgressBar from "../ProgressBar";
import QuizArea from "../QuizArea";
import NextBtn from "../NextBtn";
import Result from "../Result";
import GameHeader from "../GameHeader";

const GameBoard = ({ player }: { player: string }): ReactElement => {
    const [step, setStep] = useState<number>(0);
    const [answer, setAnswer] = useState<boolean>(false);
    const [rightAnswers, setRightAnswers] = useState<number>(0);

    const handleAnswer = (answerOption: number): void => {
        if (answerOption === gameQuiz[step].answer) {
            setRightAnswers(rightAnswers + 1);
        }
        setAnswer(true);
    }

    const handleStep = (): void => {
        setStep(step + 1);
        setAnswer(false);
    }

    const handlePlayAgain = (): void => {
        setStep(0);
        setAnswer(false);
        setRightAnswers(0);
    }

    return (

        <main className="w-[400px] h-[600px] bg-pink-800 text-pink-200 shadow-2xl shadow-black">
            <GameHeader player={player} />
            {gameQuiz.length === step ?
                <>
                    <Result rightAnswers={rightAnswers} amountOfAnswers={gameQuiz.length} onClick={handlePlayAgain} />
                </>
                :
                <>
                    <ProgressBar step={step} gameQuiz={gameQuiz} />
                    <QuizArea answer={answer} step={step} onClick={handleAnswer} gameQuiz={gameQuiz} />
                    <NextBtn answer={answer} step={step} onClick={handleStep} gameQuiz={gameQuiz} />
                </>
            }

        </main>
    )
}

export default GameBoard;