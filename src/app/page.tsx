'use client'

import { useState } from "react";
import CreatePlayer from "./components/CreatePlayer";
import GameBoard from "./components/GameBoard";

export default function Home() {
  const [player, setPlayer] = useState<string>('')

  const handleSetPlayer = (inputValue: string) => setPlayer(inputValue);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!player ? <CreatePlayer setPlayer={handleSetPlayer} /> : <GameBoard player={player} />}
    </div>
  );
}
