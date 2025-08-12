'use client'

import { useState } from "react";
import CreatePlayer from "./components/CreatePlayer";

export default function Home() {
  const [player, setPlayer] = useState<string>('')

  const handleSetPlayer = (s: string) => setPlayer(s);

  return (
    <div className="flex flex-col items-center justify-center h-screen">

      {!player ? <CreatePlayer setPlayer={handleSetPlayer} />
        : <main className="w-[400px] h-[600px] bg-amber-700">
          <div>hello</div>
          <div>hello</div>
        </main>}
    </div>
  );
}
