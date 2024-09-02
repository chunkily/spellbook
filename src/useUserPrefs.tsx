import { useContext } from "react";
import { UserPrefsContext, UserPrefsSetContext, UserPrefs } from "./userPrefs";

export function useUserPrefs() {
	const userPrefs = useContext(UserPrefsContext);
	const dispatch = useContext(UserPrefsSetContext);

	if (!userPrefs || !dispatch) {
		throw new Error("usePrefs must be used within a UserPrefsProvider");
	}

	const setUserPrefs = (newPrefs: Partial<UserPrefs>) => {
		dispatch({ type: "set", payload: newPrefs });
	};

	return {
		userPrefs,
		setUserPrefs,
	};
}
