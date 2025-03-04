import { createContext, useEffect, useReducer } from "react";

export interface UserPrefs {
	activeCharacterId: string | null;
}

const DEFAULT_USER_PREFS: UserPrefs = {
	activeCharacterId: null,
};

export const UserPrefsContext = createContext<UserPrefs | null>(null);
export const UserPrefsSetContext = createContext<React.Dispatch<{
	type: string;
	payload: Partial<UserPrefs>;
}> | null>(null);

function userPrefsReducer(
	state: UserPrefs,
	action: { type: string; payload: Partial<UserPrefs> },
) {
	if (action.type === "init") {
		return { ...state, ...action.payload };
	}

	if (action.type === "set") {
		const newState = { ...state, ...action.payload };
		localStorage.setItem("userPrefs", JSON.stringify(newState));
		return newState;
	}

	throw new Error(`Unhandled action type: ${action.type}`);
}

export function UserPrefsProvider({ children }: { children: React.ReactNode }) {
	const [userPrefs, dispatch] = useReducer(
		userPrefsReducer,
		DEFAULT_USER_PREFS,
	);

	useEffect(() => {
		const storedPrefsJson = localStorage.getItem("userPrefs");
		const storedPrefs = storedPrefsJson && JSON.parse(storedPrefsJson);

		if (areStoredPrefsValid(storedPrefs)) {
			dispatch({
				type: "init",
				payload: storedPrefs,
			});
		}
	}, []);

	return (
		<UserPrefsContext.Provider value={userPrefs}>
			<UserPrefsSetContext.Provider value={dispatch}>
				{children}
			</UserPrefsSetContext.Provider>
		</UserPrefsContext.Provider>
	);
}

function areStoredPrefsValid(prefs: unknown): prefs is UserPrefs {
	if (typeof prefs !== "object" || prefs === null || prefs === undefined) {
		return false;
	}

	if (!("activeCharacterId" in prefs)) {
		return false;
	}

	if (
		prefs.activeCharacterId !== null &&
		typeof prefs.activeCharacterId !== "string"
	) {
		return false;
	}

	return true;
}
