export function computePlayerTimer(gameState, playerSymbol) {
	const { timers, currentMoveStart, currentMove } = gameState;
	return {
		timer: timers[playerSymbol],
		timerStartAt: playerSymbol === currentMove ? currentMoveStart : undefined,
	}
}
