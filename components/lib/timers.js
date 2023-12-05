import { useEffect, useState } from "react";

export function useNow(interval, enabled) {
	const [now, setnow] = useState();

	useEffect(() => {

		if (!enabled) {
			setnow(undefined);
			return
		}

		const int = setInterval(() => {
			setnow(Date.now());
		}, interval);

		return () => {
			clearInterval(int)
		}
	}, [interval, enabled]);
	return now
}

export function useInterval(interval, enabled, cb) {
	useEffect(() => {
		if (!enabled) {
			return;
		}

		const int = setInterval(() => {
			console.log("interval");
			cb(Date.now());
		}, interval);

		return () => {
			clearInterval(int);
		};

	}, [interval, enabled, cb]);
}