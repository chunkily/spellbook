import { useId } from "react";
import ErrorList from "./ErrorList";
import { twMerge } from "tailwind-merge";
import Option, { OptionGroup } from "./Option";

interface SelectFieldProps
	extends React.SelectHTMLAttributes<HTMLSelectElement> {
	name: string;
	value: string;
	onValueChange: (value: string) => void;
	label: React.ReactNode;
	errors?: string[];
	selectClassName?: string;
	items?: (Option | OptionGroup)[];
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
	required,
	onChange: propsOnChange,
	onValueChange,
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

	const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
			<select
				id={id}
				className={selectClassName}
				aria-invalid={hasErrors}
				aria-describedby={hasErrors ? errorId : undefined}
				disabled={disabled}
				required={required}
				onChange={onChange}
				{...selectProps}
			>
				{children}
				{items?.map((item) => {
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
