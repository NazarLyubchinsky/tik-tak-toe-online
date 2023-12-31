import { PLAYERS } from "./constants";
import { BackLink } from "./ui/back-link";
import { GameCell } from "./ui/game-cell";
import { GameInfo } from "./ui/game-info";
import { GameLayout } from "./ui/game-layout";
import { GameMoveInfo } from "./ui/game-move-info";
import { GameTitle } from "./ui/game-title";
import { PlayerInfo } from "./ui/player-info";

import { GameOverModal } from "./ui/game-over-modal";
import {
	GAME_STATE_ACTIONS,
	gameStateReducer,
	initGameState,
} from "./model/game-state-reducer";
import { getNextMove } from "./model/get-next-move";
import { computeWinner } from "./model/compute-winner";
import { useCallback, useMemo, useReducer } from "react";
import { computeWinnerSymbol } from "./model/compute-winner-symbol";
import { computePlayerTimer } from "./model/compute-player-timer";
import { useInterval } from "../lib/timers";

const PLAYERS_COUNT = 2;


export function Game() {
	const [gameState, dispatch] = useReducer(
		gameStateReducer,
		{
			playersCount: PLAYERS_COUNT,
			defaultTimer: 60000,
			currentMoveStart: new Date()
		},
		initGameState
	);
	useInterval(
		1000,
		!!gameState.currentMoveStart,
		useCallback(
			() => {
				dispatch({
					type: GAME_STATE_ACTIONS.TICK,
					now: Date.now()
				});
			}
			, [])
	)

	const winnerSequence = useMemo(() => computeWinner(gameState), [gameState]);
	const nextMove = getNextMove(gameState);
	const winnerSymbol = computeWinnerSymbol(gameState, { winnerSequence, nextMove, });

	const handleCellClick = useCallback((index) => {
		dispatch({
			type: GAME_STATE_ACTIONS.CELL_CLICK,
			index,
			now: Date.now(),
		});
	}, []);

	const winnerPlayer = PLAYERS.find((player) => player.symbol === winnerSymbol);
	const { cells, currentMove, timers } = gameState;
	return (
		<>
			<GameLayout
				backLink={<BackLink />}
				title={<GameTitle />}
				gameInfo={
					<GameInfo isRatingGame playersCount={PLAYERS_COUNT} timeMode={"1 мин на ход"} />
				}
				playersList={PLAYERS.slice(0, PLAYERS_COUNT).map((player, index) => {
					const { timer, timerStartAt } = computePlayerTimer(gameState, player.symbol)
					return (
						<PlayerInfo
							key={player.id}
							avatar={player.avatar}
							name={player.name}
							rating={player.rating}
							symbol={player.symbol}
							isRight={index % 2 === 1}
							timer={timer}
							timerStartAt={timerStartAt}
						/>
					)
				})}
				gameMoveInfo={
					<GameMoveInfo currentMove={currentMove} nextMove={nextMove} />
				}
				gameCells={cells.map((cell, index) => (
					<GameCell
						key={index}
						index={index}
						isWinner={winnerSequence?.includes(index)}
						disabled={!!winnerSymbol}
						onClick={handleCellClick}
						symbol={cell}
					/>
					// <GameCell
					// 						key={index}
					// 						isWinner={winnerSequence?.includes(index)}
					// 						disabled={!!winnerSymbol}
					// 						onClick={() => {
					// 							dispatch({
					// 								type: GAME_STATE_ACTIONS.CELL_CLICK,
					// 								index,
					// 								now: Date.now()
					// 							});
					// 						}}
					// 						symbol={cell}
					// 					/>
				))}
			/>
			<GameOverModal
				winnerName={winnerPlayer?.name}
				players={PLAYERS.slice(0, PLAYERS_COUNT).map((player, index) => (
					<PlayerInfo
						key={player.id}
						avatar={player.avatar}
						name={player.name}
						rating={player.rating}
						timer={timers[player.symbol]}
						symbol={player.symbol}
						isRight={index % 2 === 1}
					/>
				))}
			/>
		</>
	);
}



// import { PLAYERS } from "./constants";
// import { BackLink } from "./ui/back-link";
// import { GameCell } from "./ui/game-cell";
// import { GameInfo } from "./ui/game-info";
// import { GameLayout } from "./ui/game-layout";
// import { GameMoveInfo } from "./ui/game-move-info";
// import { GameTitle } from "./ui/game-title";
// import { PlayerInfo } from "./ui/player-info";
// import { GameOverModal } from "./ui/game-over-modal";
// import {
// 	GAME_STATE_ACTIONS,
// 	gameStateReducer,
// 	initGameState,
// } from "./model/game-state-reducer";
// import { getNextMove } from "./model/get-next-move";
// import { computeWinner } from "./model/compute-winner";
// import { useReducer } from "react";
// import { computeWinnerSymbol } from "./model/compute-winner-symbol";
// import { computePlayerTimer } from "./model/compute-player-timer";
// import { useInterval } from "../lib/timers";
// const PLAYERS_COUNT = 2;
// export function Game() {
// 	const [gameState, dispatch] = useReducer(
// 		gameStateReducer,
// 		{
// 			playersCount: PLAYERS_COUNT,
// 			defaultTimer: 60000,
// 			currentMoveStart: new Date()
// 		},
// 		initGameState
// 	);

// 	useInterval(1000, gameState.currentMoveStart, () => {
// 		dispatch({
// 			type: GAME_STATE_ACTIONS.TICK,
// 			now: Date.now()
// 		})
// 	})

// 	const winnerSequence = computeWinner(gameState);
// 	const nextMove = getNextMove(gameState);
// 	const winnerSymbol = computeWinnerSymbol(gameState, { winnerSequence, nextMove, });

// 	const winnerPlayer = PLAYERS.find((player) => player.symbol === winnerSymbol);
// 	const { cells, currentMove, timers } = gameState;
// 	return (
// 		<>
// 			<GameLayout
// 				backLink={<BackLink />}
// 				title={<GameTitle />}
// 				gameInfo={<GameInfo isRatingGame playersCount={PLAYERS_COUNT} timeMode={"1 мин на ход"} />
// 				} playersList={PLAYERS.slice(0, PLAYERS_COUNT).map((player, index) => {
// 					const { timer, timerStartAt } = computePlayerTimer(gameState, player.symbol)
// 					return (
// 						<PlayerInfo
// 							key={player.id}
// 							avatar={player.avatar}
// 							name={player.name}
// 							rating={player.rating}
// 							symbol={player.symbol}
// 							isRight={index % 2 === 1}
// 							timer={timer}
// 							timerStartAt={timerStartAt}
// 						/>
// 					)
// 				})}
// 				gameMoveInfo={
// 					<GameMoveInfo currentMove={currentMove} nextMove={nextMove} />
// 				}
// 				gameCells={cells.map((cell, index) => (
// 					<GameCell
// 						key={index}
// 						isWinner={winnerSequence?.includes(index)}
// 						disabled={!!winnerSymbol}
// 						onClick={() => {
// 							dispatch({
// 								type: GAME_STATE_ACTIONS.CELL_CLICK,
// 								index,
// 								now: Date.now()
// 							});
// 						}}
// 						symbol={cell}
// 					/>
// 				))}
// 			/>
// 			<GameOverModal
// 				winnerName={winnerPlayer?.name}
// 				players={PLAYERS.slice(0, PLAYERS_COUNT).map((player, index) => (
// 					<PlayerInfo
// 						key={player.id}
// 						avatar={player.avatar}
// 						name={player.name}
// 						rating={player.rating}
// 						timer={timers[player.symbol]}
// 						symbol={player.symbol}
// 						isRight={index % 2 === 1}
// 					/>
// 				))}
// 			/>
// 		</>
// 	);
// }