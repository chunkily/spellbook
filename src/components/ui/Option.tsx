import React from "react";

export default interface Option {
	value: string;
	label: React.ReactNode;
}

export interface SearchableOption extends Option {
	text: string;
}

export interface OptionGroup {
	label: string;
	options: Option[];
}
