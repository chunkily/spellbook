import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";

export default function useServerState<T>(serverState: T) {
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
