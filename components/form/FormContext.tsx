import React from "react";

export interface FormContextType {
	getField(fieldName: string): string;
	getStringArrayField(fieldName: string): string[];
	getBooleanField(fieldName: string): boolean;
	getNumberField(fieldName: string): number;
	getErrors(fieldName: string): string[];
	setField(fieldName: string, value: string): void;
	setStringArrayField(fieldName: string, value: string[]): void;
	setBooleanField(fieldName: string, value: boolean): void;
	setNumberField(fieldName: string, value: number): void;
	setErrors(fieldName: string, errors: string[]): void;
}

const FormContext = React.createContext<FormContextType | undefined>(undefined);
export default FormContext;
