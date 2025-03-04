import React from "react";
import FormContext from "./FormContext";

export default function useFormField(fieldName: string) {
	const formContext = React.useContext(FormContext);

	if (!formContext) {
		throw new Error("useFormField must be used within a FormContextProvider");
	}

	const value = formContext.getField(fieldName);
	const errors = formContext.getErrors(fieldName);

	const onValueChange = (value: string) => {
		formContext.setField(fieldName, value);
	};

	const setErrors = (errors: string[]) => {
		formContext.setErrors(fieldName, errors);
	};

	return { value, errors, onValueChange, setErrors };
}

export function useStringArrayFormField(fieldName: string) {
	const formContext = React.useContext(FormContext);

	if (!formContext) {
		throw new Error("useFormField must be used within a FormContextProvider");
	}

	const value = formContext.getStringArrayField(fieldName);
	const errors = formContext.getErrors(fieldName);

	const onValueChange = (value: string[]) => {
		formContext.setStringArrayField(fieldName, value);
	};

	const setErrors = (errors: string[]) => {
		formContext.setErrors(fieldName, errors);
	};

	return { value, errors, onValueChange, setErrors };
}

export function useBooleanFormField(fieldName: string) {
	const formContext = React.useContext(FormContext);

	if (!formContext) {
		throw new Error("useFormField must be used within a FormContextProvider");
	}

	const value = formContext.getBooleanField(fieldName);
	const errors = formContext.getErrors(fieldName);

	const onValueChange = (value: boolean) => {
		formContext.setBooleanField(fieldName, value);
	};

	const setErrors = (errors: string[]) => {
		formContext.setErrors(fieldName, errors);
	};

	return { value, errors, onValueChange, setErrors };
}

export function useNumberFormField(fieldName: string) {
	const formContext = React.useContext(FormContext);

	if (!formContext) {
		throw new Error("useFormField must be used within a FormContextProvider");
	}

	const value = formContext.getNumberField(fieldName);
	const errors = formContext.getErrors(fieldName);

	const onValueChange = (value: number) => {
		formContext.setNumberField(fieldName, value);
	};

	const setErrors = (errors: string[]) => {
		formContext.setErrors(fieldName, errors);
	};

	return { value, errors, onValueChange, setErrors };
}
