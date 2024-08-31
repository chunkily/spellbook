import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";

// Only these types are safe to use as dependencies in useEffect
type SafeTypes = string | number | boolean | null;

// https://stackoverflow.com/questions/57858862/ensure-that-generic-type-only-has-primitive-properties-in-typescript
type AsJson<T> = T extends string | number | boolean | null
	? T
	: // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
		T extends Function
		? never
		: T extends object
			? { [K in keyof T]: AsJson<T[K]> }
			: never;

export default function useServerState<T extends SafeTypes>(serverState: T) {
	const [state, setState] = useState(serverState);
	const navigation = useNavigation();

	// Reset the state whenever there is a navigation event
	useEffect(() => {
		if (navigation.state === "idle") {
			setState(serverState);
		}
	}, [navigation.state, serverState]);

	return [state, setState] as const;
}

export function useServerStateArray<T>(serverState: T[] & AsJson<T[]>) {
	const [state, setState] = useState<T[]>(serverState);
	const navigation = useNavigation();

	const serverStateJson = JSON.stringify(serverState);

	// Reset the state whenever there is a navigation event
	useEffect(() => {
		if (navigation.state === "idle") {
			setState(JSON.parse(serverStateJson));
		}
	}, [navigation.state, serverStateJson]);

	return [state, setState] as const;
}

export function useServerStateObject<T>(serverState: T & AsJson<T>) {
	const [state, setState] = useState<T>(serverState);
	const navigation = useNavigation();

	const serverStateJson = JSON.stringify(serverState);

	// Reset the state whenever there is a navigation event
	useEffect(() => {
		if (navigation.state === "idle") {
			setState(JSON.parse(serverStateJson));
		}
	}, [navigation.state, serverStateJson]);

	return [state, setState] as const;
}
