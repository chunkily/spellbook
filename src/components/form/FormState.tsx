export default interface FormState {
	fields: Record<string, string>;
	errors: Record<string, string[]>;
}
