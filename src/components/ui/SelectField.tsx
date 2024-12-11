import { useId } from "react";
import ErrorList from "./ErrorList";
import { twMerge } from "tailwind-merge";
import Option, { OptionGroup } from "./Option";
import Select from "./Select";
import { useFormField } from "./Form";

interface SelectFieldProps
	extends React.SelectHTMLAttributes<HTMLSelectElement> {
	name: string;
	label: React.ReactNode;
	selectClassName?: string;
	items?: (Option | OptionGroup)[];
}

export default function SelectField({
	id,
	name,
	label,
	className: propClassName,
	selectClassName,
	children,
	items,
	required,
	onChange: propsOnChange,
	...rest
}: SelectFieldProps) {
	const fallbackId = useId();
	id = id || fallbackId;
	const errorId = `${id}-error`;

	const field = useFormField(name);

	const errors = field.errors;

	const hasErrors = errors && errors.length > 0;

	const baseClassName = "mb-3 max-w-lg";

	const className = twMerge(baseClassName, propClassName);

	const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		field.onValueChange(e.target.value);

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
			<Select
				id={id}
				name={name}
				className={selectClassName}
				required={required}
				onChange={onChange}
				items={items}
				value={field.value}
				{...rest}
			>
				{children}
			</Select>
			{hasErrors ? <ErrorList id={errorId} errors={errors} /> : null}
		</div>
	);
}
