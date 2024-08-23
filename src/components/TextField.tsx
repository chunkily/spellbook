import { useId } from "react";
import { twMerge } from "tailwind-merge";
import ErrorList from "./ErrorList";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
	...rest
}: TextFieldProps) {
	const fallbackId = useId();
	id = id || fallbackId;

	const hasErrors = errors && errors.length > 0;
	const errorId = `${id}-error`;

	const baseClassName = "mb-3 max-w-lg";

	const className = twMerge(baseClassName, propClassName);

	let baseInputClassName = "w-full px-3 py-2 border border-gray-300 rounded-md";

	if (hasErrors) {
		baseInputClassName += " border-red-500";
	}

	if (disabled) {
		baseInputClassName += " bg-gray-100";
	}

	const inputClassName = twMerge(baseInputClassName, propInputClassName);

	return (
		<div className={className}>
			<label className="block" htmlFor={id}>
				{label}
			</label>
			<input
				id={id}
				className={inputClassName}
				aria-invalid={hasErrors}
				aria-describedby={hasErrors ? errorId : undefined}
				{...rest}
			/>
			{hasErrors ? <ErrorList id={errorId} errors={errors} /> : null}
		</div>
	);
}
