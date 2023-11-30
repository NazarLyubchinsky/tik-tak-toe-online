import { useState } from "react";

import { GameInfo } from "../components/game/GameInfo";
import { GameTitle } from "../components/game/GameTitle";
import { useGameState } from "../components/game/UseGameState";

import { Header } from "../components/header";
import { GameField } from "../components/game/GameField";

export default function HomePage() {
	const [playersCount] = useState(2);

	const { cells, currentMove, handleCellClick, nextMove,  winnerSequence }
		= useGameState(playersCount);
	return (
		<>
			<div className="bg-slate-50 min-h-screen">
				<Header />
				<main className="pt-6 mx-auto w-max">
					<GameTitle playersCount={playersCount} />

					<GameInfo className="mt-4"
						playersCount={playersCount}
						currentMove={currentMove} />

					<GameField className="mt-6"
						cells={cells}
						currentMove={currentMove}
						handleCellClick={handleCellClick}
						nextMove={nextMove}
						winnerSequence={winnerSequence} />
				</main>
			</div>
		</>
	);
}
