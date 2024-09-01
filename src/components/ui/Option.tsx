export default interface Option {
	value: string;
	label: React.ReactNode;
}

export interface OptionGroup {
	label: string;
	options: Option[];
}
