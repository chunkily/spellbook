export default function getFormStringValue(
	form: FormData,
	key: string,
): string | undefined {
	const value = form.get(key);

	if (value === null) {
		return undefined;
	}

	if (typeof value === "string") {
		return value;
	}

	// value is a file
	return undefined;
}
