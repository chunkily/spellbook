import React from "react";
import FormContext from "./FormContext.tsx";

export default function useFormField(fieldName: string) {
	const formContext = React.useContext(FormContext);

	if (!formContext) {
		throw new Error("useFormField must be used within a FormContextProvider");
	}

	const value = formContext.getField(fieldName);
	const errors = formContext.getErrors(fieldName);

	const onValueChange = (value: string) => {
		formContext.dispatch({ type: "SET_FIELD", fieldName, value });
	};

	const setErrors = (errors: string[]) => {
		formContext.dispatch({ type: "SET_ERROR", fieldName, errors });
	};

	return { value, errors, onValueChange, setErrors };
}

export function useStringArrayFormField(fieldName: string) {
	const { value, errors, onValueChange, setErrors } = useFormField(fieldName);

	const onValueChangeArray = (value: string[]) => {
		onValueChange(JSON.stringify(value));
	};

	return {
		value: value ? (JSON.parse(value) as string[]) : [],
		errors,
		onValueChange: onValueChangeArray,
		setErrors,
	};
}

export function useBooleanFormField(fieldName: string) {
	const { value, errors, onValueChange, setErrors } = useFormField(fieldName);

	const onValueChangeBoolean = (value: boolean) => {
		onValueChange(value.toString());
	};

	return {
		value: value === "true",
		errors,
		onValueChange: onValueChangeBoolean,
		setErrors,
	};
}

export function useNumberFormField(fieldName: string) {
	const { value, errors, onValueChange, setErrors } = useFormField(fieldName);

	const onValueChangeNumber = (value: number) => {
		onValueChange(value.toString());
	};

	return {
		value: parseFloat(value),
		errors,
		onValueChange: onValueChangeNumber,
		setErrors,
	};
}
