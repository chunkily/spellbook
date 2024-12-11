import { useId } from "react";
import { twMerge } from "tailwind-merge";
import ErrorList from "./ErrorList";
import TextInput from "./TextInput";
import useFormField from "../form/useFormField";

interface TextFieldProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue"> {
	name: string;
	label: React.ReactNode;
	inputClassName?: string;
}

export default function TextField({
	className: propClassName,
	inputClassName,
	label,
	id,
	name,
	required,
	onChange: propsOnChange,
	...rest
}: TextFieldProps) {
	const fallbackId = useId();
	id = id || fallbackId;

	const field = useFormField(name);

	const errors = field.errors;

	const hasErrors = errors && errors.length > 0;
	const errorId = `${id}-error`;

	const baseClassName = "mb-3 max-w-lg";

	const className = twMerge(baseClassName, propClassName);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		field.onValueChange(e.target.value);

		if (required && !e.target.value) {
			field.setErrors(["This field is required"]);
		} else {
			field.setErrors([]);
		}

		if (propsOnChange) {
			propsOnChange(e);
		}
	};

	return (
		<div className={className}>
			<label
				className="block mb-1 text-sm font-medium text-gray-900"
				htmlFor={id}
			>
				{label} {required ? <span title="Required">*</span> : null}
			</label>
			<TextInput
				id={id}
				name={name}
				className={inputClassName}
				required={required}
				onChange={onChange}
				isInvalid={hasErrors}
				errorId={errorId}
				value={field.value}
				{...rest}
			/>
			{hasErrors ? <ErrorList id={errorId} errors={errors} /> : null}
		</div>
	);
}
