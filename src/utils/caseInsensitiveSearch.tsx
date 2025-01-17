export function caseInsensitiveSearch(
	text: string,
	inputValue: string,
): boolean {
	// Replace all non-alphanumeric, non-whitespace characters with an empty string
	const strippedInput = inputValue.replace(/[^\w\s]/g, "");
	const regex = new RegExp(strippedInput, "i");

	return regex.test(text);
}
