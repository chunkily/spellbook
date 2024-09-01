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

	const baseInputClassName = "ml-1";
	const inputClassName = twMerge(baseInputClassName, propsInputClassName);

	const baseLabelClassName = "ml-1";
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
