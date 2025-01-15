import { useReducer } from "react";
import { useNavigation } from "react-router";
import FormAction from "./FormAction";
import { FormContextType } from "./FormContext";
import FormState from "./FormState";
import useDeepCompareEffect from "use-deep-compare-effect";

function valuesToFields(
	values: Record<string, unknown> | undefined | null,
): Record<string, string> {
	if (!values) {
		return {};
	}

	const serverFields: Record<string, string> = {};

	function processValue(key: string, value: unknown) {
		if (typeof value === "string") {
			serverFields[key] = value;
		} else if (
			Array.isArray(value) &&
			value.every((item) => typeof item === "string")
		) {
			serverFields[key] = JSON.stringify(value);
		} else if (typeof value === "number") {
			serverFields[key] = value.toString();
		} else if (typeof value === "boolean") {
			serverFields[key] = value.toString();
		} else if (typeof value === "object" && value !== null) {
			for (const nestedKey in value) {
				processValue(
					`${key}.${nestedKey}`,
					(value as Record<string, unknown>)[nestedKey],
				);
			}
		} else if (value === undefined || value === null) {
			serverFields[key] = "";
		} else {
			throw new Error(`Invalid value type key: ${key} value: ${value}`);
		}
	}

	for (const key in values) {
		if (Object.prototype.hasOwnProperty.call(values, key)) {
			processValue(key, values[key]);
		}
	}

	return serverFields;
}

export default function useFormContext({
	serverValues,
	serverErrors = {},
	stateReducer,
}: {
	serverValues?: Record<string, unknown>;
	serverErrors?: Record<string, string[]>;
	stateReducer?: React.Reducer<FormState, FormAction>;
} = {}): FormContextType {
	const serverFields = valuesToFields(serverValues);

	const [formState, formDispatch] = useReducer(
		(state: FormState, action: FormAction) => {
			if (stateReducer) {
				return stateReducer(state, action);
			}

			let newState: FormState;
			switch (action.type) {
				case "SET_FIELD":
					newState = {
						...state,
						fields: {
							...state.fields,
							[action.fieldName]: action.value,
						},
					};
					break;
				case "SET_ERROR":
					newState = {
						...state,
						errors: {
							...state.errors,
							[action.fieldName]: action.errors,
						},
					};
					break;
				case "RESET":
					newState = {
						fields: action.fields,
						errors: action.errors,
					};
					break;
				default:
					throw new Error("Invalid action type");
			}

			return newState;
		},
		{
			fields: serverFields,
			errors: serverErrors,
		},
	);

	const navigation = useNavigation();

	// Reset the state whenever there is a navigation event
	useDeepCompareEffect(() => {
		if (navigation.state === "idle") {
			formDispatch({
				type: "RESET",
				fields: serverFields,
				errors: serverErrors,
			});
		}
	}, [navigation.state, serverFields, serverErrors]);

	const getField = (fieldName: string) => {
		return formState.fields[fieldName] ?? "";
	};

	const getStringArrayField = (fieldName: string) => {
		return JSON.parse(formState.fields[fieldName] ?? "[]") as string[];
	};

	const getBooleanField = (fieldName: string) => {
		return formState.fields[fieldName] === "true";
	};

	const getNumberField = (fieldName: string) => {
		return parseFloat(formState.fields[fieldName] ?? "0");
	};

	const getErrors = (fieldName: string) => {
		return formState.errors[fieldName] || [];
	};

	const setField = (fieldName: string, value: string) => {
		formDispatch({
			type: "SET_FIELD",
			fieldName,
			value,
		});
	};

	const setStringArrayField = (fieldName: string, value: string[]) => {
		formDispatch({
			type: "SET_FIELD",
			fieldName,
			value: JSON.stringify(value),
		});
	};

	const setBooleanField = (fieldName: string, value: boolean) => {
		formDispatch({
			type: "SET_FIELD",
			fieldName,
			value: value.toString(),
		});
	};

	const setNumberField = (fieldName: string, value: number) => {
		formDispatch({
			type: "SET_FIELD",
			fieldName,
			value: value.toString(),
		});
	};

	const setErrors = (fieldName: string, errors: string[]) => {
		formDispatch({
			type: "SET_ERROR",
			fieldName,
			errors,
		});
	};

	return {
		getField,
		getStringArrayField,
		getBooleanField,
		getNumberField,
		getErrors,
		setField,
		setStringArrayField,
		setBooleanField,
		setNumberField,
		setErrors,
	};
}

