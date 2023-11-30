import { useState } from "react";

import { GameInfo } from "../components/game/GameInfo";
import { GameTitle } from "../components/game/GameTitle";
import { useGameState } from "../components/game/UseGameState";

import { Header } from "../components/header";
import { GameField } from "../components/game/GameField";
import { GameSymbol } from "../components/game/GameSymbol";
import { UiModal } from "../components/uikit/UiModal";
import { UiButton } from "../components/uikit/UiButton";

export default function HomePage() {
	const [playersCount] = useState(2);
	const {
		cells,
		currentMove,
		handleCellClick,
		nextMove,
		winnerSequence,
		handlePlayerTimeOver,
		winnerSymbol,
	} = useGameState(playersCount);
	return (
		<>
			<div className="bg-slate-50 min-h-screen">
				<Header />
				<main className="pt-6 mx-auto w-max">
					<GameTitle playersCount={playersCount} />

					<GameInfo className="mt-4"
						playersCount={playersCount}
						currentMove={currentMove}
						isWinner={!!winnerSymbol}
						onPlayerTimeOver={handlePlayerTimeOver}
					/>
					{winnerSymbol && (
						<div className="my-4">
							<GameSymbol symbol={winnerSymbol} />
						</div>
					)}
					<UiModal width="md"  isOpen={winnerSymbol}  onClose={() => console.log("close")}>
						<UiModal.Header>Game Over</UiModal.Header>
						<UiModal.Body>
							<div className="text-sm">
								Победитель: <span className="text-teal-600">Paromovevg </span>
							</div>
						</UiModal.Body>
						<UiModal.Footer>
							<UiButton size="md" variant="outline">Back</UiButton>
							<UiButton size="md" variant="primary">Play Again</UiButton>
						</UiModal.Footer>
					</UiModal>

					<GameField className="mt-6"
						cells={cells}
						currentMove={currentMove}
						handleCellClick={handleCellClick}
						nextMove={nextMove}
						winnerSequence={winnerSequence}
						winnerSymbol={winnerSymbol}
					/>
				</main>
			</div>
		</>
	);
}

