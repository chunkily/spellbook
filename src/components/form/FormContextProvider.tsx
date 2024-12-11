import React from "react";
import FormContext, { FormContextType } from "./FormContext";
import useFormContext from "./useFormContext";

interface FormContextProviderProps {
	children: React.ReactNode;
	formContext?: FormContextType;
}

export default function FormContextProvider({
	children,
	formContext,
}: FormContextProviderProps) {
	const fallbackFormContext = useFormContext({});
	formContext = formContext || fallbackFormContext;

	return (
		<FormContext.Provider value={formContext}>{children}</FormContext.Provider>
	);
}
