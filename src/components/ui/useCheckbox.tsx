import useServerState, { useServerStateArray } from "@/utils/useServerState";

export default function useCheckbox({
	serverValue,
	serverErrors,
}: {
	serverValue?: boolean;
	serverErrors?: string[];
}) {
	const [checked, setChecked] = useServerState(serverValue ?? false);
	const [errors, setErrors] = useServerStateArray(serverErrors ?? []);

	const onCheckedChange = (checked: boolean) => {
		setChecked(checked);
		setErrors([]);
	};

	return {
		checked,
		onCheckedChange,
		errors,
	};
}
