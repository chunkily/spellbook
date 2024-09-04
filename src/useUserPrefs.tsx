import { useCallback, useContext } from "react";
import { UserPrefsContext, UserPrefsSetContext, UserPrefs } from "./userPrefs";

export function useUserPrefs() {
	const userPrefs = useContext(UserPrefsContext);
	const dispatch = useContext(UserPrefsSetContext);

	if (!userPrefs || !dispatch) {
		throw new Error("usePrefs must be used within a UserPrefsProvider");
	}

	// Memoize the function so that it can be used in useEffect dependencies
	const setUserPrefs = useCallback(
		(newPrefs: Partial<UserPrefs>) => {
			dispatch({ type: "set", payload: newPrefs });
		},
		[dispatch],
	);

	return {
		userPrefs,
		setUserPrefs,
	};
}
