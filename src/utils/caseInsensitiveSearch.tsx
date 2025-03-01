export function caseInsensitiveSearch(
	text: string,
	inputValue: string,
): boolean {
	// Escape special characters in the input string
	const escapedInput = inputValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	// i flag makes the search case-insensitive
	const regex = new RegExp(escapedInput, "i");

	return regex.test(text);
}
