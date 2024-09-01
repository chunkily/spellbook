import { useId } from "react";
import { twMerge } from "tailwind-merge";
import ErrorList from "./ErrorList";

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
	inputClassName: propInputClassName,
	label,
	id,
	errors,
	disabled,
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

	let baseInputClassName = "w-full px-3 py-2 border rounded-md";

	if (hasErrors) {
		baseInputClassName += " border-red-500";
	} else {
		baseInputClassName += " border-gray-300";
	}

	if (disabled) {
		baseInputClassName += " bg-gray-100";
	}

	const inputClassName = twMerge(baseInputClassName, propInputClassName);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onValueChange(e.target.value);

		if (propsOnChange) {
			propsOnChange(e);
		}
	};

	return (
		<div className={className}>
			<label className="block" htmlFor={id}>
				{label} {required ? <span title="Required">*</span> : null}
			</label>
			<input
				id={id}
				className={inputClassName}
				aria-invalid={hasErrors}
				aria-describedby={hasErrors ? errorId : undefined}
				disabled={disabled}
				required={required}
				onChange={onChange}
				{...rest}
			/>
			{hasErrors ? <ErrorList id={errorId} errors={errors} /> : null}
		</div>
	);
}
