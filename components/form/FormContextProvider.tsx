import React from "react";
import FormContext, { type FormContextType } from "./FormContext";

interface FormContextProviderProps {
	children: React.ReactNode;
	formContext: FormContextType;
}

export default function FormContextProvider({
	children,
	formContext,
}: FormContextProviderProps) {
	return (
		<FormContext.Provider value={formContext}>{children}</FormContext.Provider>
	);
}
