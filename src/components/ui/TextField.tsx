import { useId } from "react";
import { twMerge } from "tailwind-merge";
import ErrorList from "./ErrorList";
import TextInput from "./TextInput";

interface TextFieldProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue"> {
	name: string;
	value: string;
	onValueChange: (value: string) => void;
	label: React.ReactNode;
	errors?: string[];
	inputClassName?: string;
}

export default function TextField({
	className: propClassName,
	inputClassName,
	label,
	id,
	errors,
	required,
	onChange: propsOnChange,
	onValueChange,
	...rest
}: TextFieldProps) {
	const fallbackId = useId();
	id = id || fallbackId;

	const hasErrors = errors && errors.length > 0;
	const errorId = `${id}-error`;

	const baseClassName = "mb-3 max-w-lg";

	const className = twMerge(baseClassName, propClassName);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onValueChange(e.target.value);

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
				className={inputClassName}
				required={required}
				onChange={onChange}
				isInvalid={hasErrors}
				errorId={errorId}
				{...rest}
			/>
			{hasErrors ? <ErrorList id={errorId} errors={errors} /> : null}
		</div>
	);
}

