// import { Game } from "../components/game/game";

import { useState } from "react";
import { GameField, GameInfo, GameTitle } from "../components/game";
import { Header } from "../components/header";

export default function HomePage() {
	const [playersCount] = useState(4);
	return (
		<>
			{/* <Game /> */}
			<div className="bg-slate-50 min-h-screen">
				<Header />
				<main className="pt-6 mx-auto w-max">
					<GameTitle playersCount={playersCount} />
					<GameInfo className="mt-4" playersCount={playersCount} />
					<GameField className="mt-6" playersCount={playersCount} />
				</main>
			</div>
		</>
	);
}
