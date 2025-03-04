export default function getFormStringArray(
	form: FormData,
	key: string,
): string[] {
	const value = form.get(key);

	if (value === null) {
		return [];
	}

	if (typeof value !== "string") {
		return [];
	}

	return value.split(",");
}
