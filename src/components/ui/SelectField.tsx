import { useId } from "react";
import ErrorList from "./ErrorList";
import { twMerge } from "tailwind-merge";
import Option, { OptionGroup } from "./Option";
import Select from "./Select";

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
	selectClassName,
	children,
	items,
	required,
	onChange: propsOnChange,
	onValueChange,
	...rest
}: SelectFieldProps) {
	const fallbackId = useId();
	id = id || fallbackId;
	const errorId = `${id}-error`;

	const hasErrors = errors && errors.length > 0;

	const baseClassName = "mb-3 max-w-lg";

	const className = twMerge(baseClassName, propClassName);

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
			<Select
				id={id}
				className={selectClassName}
				required={required}
				onChange={onChange}
				items={items}
				{...rest}
			>
				{children}
			</Select>
			{hasErrors ? <ErrorList id={errorId} errors={errors} /> : null}
		</div>
	);
}
