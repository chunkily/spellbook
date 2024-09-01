import useServerState, { useServerStateArray } from "@/utils/useServerState";
import { useCallback } from "react";

export default function useTextAreaField({
	serverValue,
	serverErrors,
	validationMode = "none",
	required,
}: {
	serverValue: string | undefined;
	serverErrors?: string[];
	maxLength?: number;
	required?: boolean;
	validationMode?: "none" | "onChange";
}) {
	const [value, setValue] = useServerState(serverValue ?? "");
	const [errors, setErrors] = useServerStateArray(serverErrors ?? []);

	const onValueChange = useCallback(
		(newValue: string) => {
			setValue(newValue);
			if (validationMode === "onChange") {
				setErrors([]);
			}
		},
		[setValue, setErrors, validationMode],
	);

	return {
		value,
		errors,
		onValueChange,
		charCount: value.length,
		required,
	};
}
