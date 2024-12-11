import React from "react";
import FormAction from "./FormAction";

export interface FormContextType {
	dispatch: React.Dispatch<FormAction>;
	getField(fieldName: string): string;
	getStringArrayField(fieldName: string): string[];
	getBooleanField(fieldName: string): boolean;
	getNumberField(fieldName: string): number;
	getErrors(fieldName: string): string[];
}

const FormContext = React.createContext<FormContextType | undefined>(undefined);
export default FormContext;
