// import { Game } from "../components/game/game";

import { GameField, GameInfo, GameTitle } from "../components/game";
import { Header } from "../components/header";

export default function HomePage() {
  return (
    <>
      {/* <Game /> */}
      <div className="bg-slate-50 min-h-screen">
        <Header />
        <main className="pt-6 mx-auto w-max">
          <GameTitle />
          <GameInfo className="mt-4" />
          <GameField className="mt-6" />
        </main>
      </div>
    </>
  );
}
