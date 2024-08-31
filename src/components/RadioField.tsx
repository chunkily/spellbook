import React from "react";
import { twMerge } from "tailwind-merge";
import Option from "./Option";
import Radio from "./Radio";
import ErrorList from "./ErrorList";

interface RadioFieldProps {
	name: string;
	label: React.ReactNode;
	value?: string;
	onValueChange: (value: string) => void;
	variant?: "horizontal" | "vertical";
	className?: string;
	radioClassName?: string;
	fieldsetClassName?: string;
	items?: Option[];
	errors?: string[];
	children?: React.ReactNode;
}

export default function RadioField({
	name,
	label,
	className: propClassName,
	radioClassName,
	fieldsetClassName: propsFieldsetClassName,
	items,
	value,
	onValueChange,
	children,
	errors,
}: RadioFieldProps) {
	const baseClassName = "mb-3 max-w-lg";

	const className = twMerge(baseClassName, propClassName);

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

	return (
		<div className={className}>
			<fieldset className={fieldsetClassName}>
				<legend>{label}</legend>
				<div className="flex flex-wrap gap-2">
					{children}
					{items?.map((item) => (
						<Radio
							key={item.value}
							name={name}
							value={item.value}
							checked={item.value === value}
							onChange={() => onValueChange(item.value)}
							className={radioClassName}
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
