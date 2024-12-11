import { useId } from "react";
import { twMerge } from "tailwind-merge";
import { useFormField } from "./Form";

interface CheckboxProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"type" | "defaultChecked" | "value"
	> {
	name: string;
	label?: React.ReactNode;
	children?: React.ReactNode;
	valueIfTrue?: string;
	valueIfFalse?: string;
}

export default function Checkbox({
	id,
	name,
	valueIfTrue = "true",
	valueIfFalse = "false",
	onChange: propsOnChange,
	className: propsClassName,
	label,
	children,
	...rest
}: CheckboxProps) {
	const fallbackId = useId();
	id = id || fallbackId;

	const field = useFormField(name);

	const checked = field.value === valueIfTrue;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		field.onValueChange(e.target.checked ? valueIfTrue : valueIfFalse);

		if (propsOnChange) {
			propsOnChange(e);
		}
	};

	const baseClassName = "inline-block whitespace-nowrap";
	const className = twMerge(baseClassName, propsClassName);

	return (
		<div className={className}>
			<input
				className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
				id={id}
				type="checkbox"
				name={name}
				value={valueIfTrue}
				onChange={onChange}
				{...rest}
			/>
			{!checked ? (
				<input type="hidden" name={name} value={valueIfFalse} />
			) : null}
			<label className="ms-2 text-sm font-medium text-gray-900" htmlFor={id}>
				{children}
				{label}
			</label>
		</div>
	);
}

