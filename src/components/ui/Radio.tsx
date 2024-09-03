import { useId } from "react";
import { twMerge } from "tailwind-merge";

interface RadioProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
	label?: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
	inputClassName?: string;
	labelClassName?: string;
}

export default function Radio({
	children,
	label,
	id,
	className: propsClassName,
	inputClassName: propsInputClassName,
	labelClassName: propsLabelClassName,
	...rest
}: RadioProps) {
	const baseClassName = "inline-block whitespace-nowrap";
	const className = twMerge(baseClassName, propsClassName);

	const baseInputClassName =
		"ml-1 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300";
	const inputClassName = twMerge(baseInputClassName, propsInputClassName);

	const baseLabelClassName = "ml-1 ms-2 text-sm font-medium text-gray-900";
	const labelClassName = twMerge(baseLabelClassName, propsLabelClassName);

	const fallbackId = useId();
	id = id || fallbackId;
	return (
		<div className={className}>
			<input className={inputClassName} id={id} type="radio" {...rest} />
			<label className={labelClassName} htmlFor={id}>
				{children}
				{label}
			</label>
		</div>
	);
}
