'use client'
import { ReactElement, useState } from "react";

const CreatePlayer = ({ setPlayer }: { setPlayer: (s: string) => void }): ReactElement => {
    const [currentInput, setCurrentInput] = useState<string>('');

    return (
        <div data-testid='createPlayer' className="flex flex-col bg-pink-800 text-pink-100 p-4 text-center shadow-2xl shadow-gray-500">
            <label htmlFor='name' className="tracking-wide text-2xl mb-3">Pick a name</label>
            <input id='name' className="bg-pink-200  text-gray-900 placeholder:text-center placeholder:text-gray-500 text-center" type="text" placeholder="Your name" value={currentInput} onChange={(e) => setCurrentInput(e.target.value)}
                maxLength={15}></input>
            <button className="bg-pink-400 disabled:text-gray-500 disabled:bg-pink-300 cursor-pointer disabled:cursor-not-allowed" disabled={currentInput.length < 3} onClick={() => setPlayer(currentInput)}>Start game</button>
        </div>
    )
}

export default CreatePlayer;