import { useId } from "react";
import ErrorList from "./ErrorList";
import { twMerge } from "tailwind-merge";
import Option, { OptionGroup } from "./Option";

interface SelectFieldProps
	extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label: React.ReactNode;
	errors?: string[];
	selectClassName?: string;
	items: (Option | OptionGroup)[];
}

export default function SelectField({
	id,
	label,
	errors,
	className: propClassName,
	selectClassName: propSelectClassName,
	children,
	items,
	disabled,
	...selectProps
}: SelectFieldProps) {
	const fallbackId = useId();
	id = id || fallbackId;
	const errorId = `${id}-error`;

	const hasErrors = errors && errors.length > 0;

	const baseClassName = "mb-3 max-w-lg";

	const className = twMerge(baseClassName, propClassName);

	let baseSelectClassName =
		"w-full px-3 py-2 border border-gray-300 rounded-md";

	if (hasErrors) {
		baseSelectClassName += " border-red-500";
	}

	if (disabled) {
		baseSelectClassName += " bg-gray-100";
	}

	const selectClassName = twMerge(baseSelectClassName, propSelectClassName);

	return (
		<div className={className}>
			<label className="block" htmlFor={id}>
				{label}
			</label>
			<select
				id={id}
				className={selectClassName}
				aria-invalid={hasErrors}
				aria-describedby={hasErrors ? errorId : undefined}
				disabled={disabled}
				{...selectProps}
			>
				{children}
				{items.map((item) => {
					if ("options" in item) {
						return (
							<optgroup key={item.label} label={item.label}>
								{item.options.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</optgroup>
						);
					}

					return (
						<option key={item.value} value={item.value}>
							{item.label}
						</option>
					);
				})}
			</select>
			{hasErrors ? <ErrorList id={errorId} errors={errors} /> : null}
		</div>
	);
}
