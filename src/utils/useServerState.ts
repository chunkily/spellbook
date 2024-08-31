import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";

// Only these types are safe to use as dependencies in useEffect
type SafeTypes = string | number | boolean | null | undefined;

type SafeObject = {
	[key: string]: SafeTypes | SafeTypes[] | SafeObject;
};

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

export function useServerStateArray<T extends SafeTypes>(serverState: T[]) {
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

export function useServerStateObject<T extends SafeObject>(serverState: T) {
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
