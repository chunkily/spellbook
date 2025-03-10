import { useId } from "react";
import { twMerge } from "tailwind-merge";
import { useBooleanFormField } from "../form/useFormField";

interface CheckboxProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"type" | "defaultChecked" | "value"
	> {
	name: string;
	label?: React.ReactNode;
	children?: React.ReactNode;
}

export default function Checkbox({
	id,
	name,
	onChange: propsOnChange,
	className: propsClassName,
	label,
	children,
	...rest
}: CheckboxProps) {
	const fallbackId = useId();
	id = id || fallbackId;

	const field = useBooleanFormField(name);

	const checked = field.value;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		field.onValueChange(e.target.checked);

		if (propsOnChange) {
			propsOnChange(e);
		}
	};

	const baseClassName = "inline-block whitespace-nowrap";
	const className = twMerge(baseClassName, propsClassName);

	return (
		<div className={className}>
			<input
				className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2 "
				id={id}
				type="checkbox"
				name={name}
				value="true"
				onChange={onChange}
				checked={checked}
				{...rest}
			/>
			<label className="ms-2 text-sm font-medium text-gray-900" htmlFor={id}>
				{children}
				{label}
			</label>
		</div>
	);
}
