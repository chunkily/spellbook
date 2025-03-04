import cn from "@/utils/cn";
import { useId } from "react";

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
	disabled,
	className: propsClassName,
	inputClassName: propsInputClassName,
	labelClassName: propsLabelClassName,
	...rest
}: RadioProps) {
	const baseClassName = "inline-block whitespace-nowrap";
	const className = cn(
		baseClassName,
		disabled && "opacity-50 cursor-not-allowed",
		propsClassName,
	);

	const baseInputClassName =
		"ml-1 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300";
	const inputClassName = cn(
		baseInputClassName,
		disabled && "cursor-not-allowed",
		propsInputClassName,
	);

	const baseLabelClassName = "ml-1 ms-2 text-sm font-medium text-gray-900";
	const labelClassName = cn(
		baseLabelClassName,
		disabled && "cursor-not-allowed",
		propsLabelClassName,
	);

	const fallbackId = useId();
	id = id || fallbackId;
	return (
		<div className={className}>
			<input
				className={inputClassName}
				id={id}
				type="radio"
				disabled={disabled}
				{...rest}
			/>
			<label className={labelClassName} htmlFor={id}>
				{children}
				{label}
			</label>
		</div>
	);
}
