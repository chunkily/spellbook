import React from "react";
import { twMerge } from "tailwind-merge";
import Option from "./Option";
import Radio from "./Radio";
import ErrorList from "./ErrorList";
import useFormField from "../form/useFormField";

interface RadioFieldProps {
	name: string;
	label: React.ReactNode;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	variant?: "horizontal" | "vertical";
	className?: string;
	radioClassName?: string;
	fieldsetClassName?: string;
	items?: Option[];
	children?: React.ReactNode;
	required?: boolean;
}

export default function RadioField({
	name,
	label,
	required,
	className: propClassName,
	radioClassName,
	fieldsetClassName: propsFieldsetClassName,
	items,
	onChange,
	children,
}: RadioFieldProps) {
	const baseClassName = "mb-3 max-w-lg";

	const className = twMerge(baseClassName, propClassName);

	const field = useFormField(name);

	const errors = field.errors;

	const hasErrors = errors && errors.length > 0;

	let baseFieldsetClassName = "border rounded-md p-3";
	if (hasErrors) {
		baseFieldsetClassName += " border-red-500";
	} else {
		baseFieldsetClassName += " border-gray-700";
	}

	const fieldsetClassName = twMerge(
		baseFieldsetClassName,
		propsFieldsetClassName,
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		field.onValueChange(e.target.value);

		if (onChange) {
			onChange(e);
		}
	};

	return (
		<div className={className}>
			<fieldset className={fieldsetClassName}>
				<legend>
					{label} {required ? <span title="Required">*</span> : null}
				</legend>
				<div className="flex flex-wrap gap-2">
					{children}
					{items?.map((item) => (
						<Radio
							key={item.value}
							name={name}
							value={item.value}
							checked={item.value === field.value}
							onChange={handleChange}
							className={radioClassName}
							required={required}
						>
							{item.label}
						</Radio>
					))}
				</div>
			</fieldset>
			{hasErrors ? <ErrorList errors={errors} /> : null}
		</div>
	);
}
