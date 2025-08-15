import { ReactElement } from "react";

const GameHeader = ({ player }: { player: string }): ReactElement => {
    return (
        <header>
            <h3 className="text-4xl tracking-wider text-center p-3">☕Coffee Quiz</h3>
            <p className="text-center">Player: <span>{player}</span></p>
        </header>
    )
}

export default GameHeader;