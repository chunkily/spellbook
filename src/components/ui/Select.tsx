import { twMerge } from "tailwind-merge";
import Option, { OptionGroup } from "./Option";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	items?: (Option | OptionGroup)[];
	isInvalid?: boolean;
	errorId?: string;
}
export default function Select({
	items,
	isInvalid,
	errorId,
	disabled,
	required,
	className: propsClassName,
	children,
	...rest
}: SelectProps) {
	let baseClassName =
		"border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

	if (isInvalid) {
		baseClassName += " border-red-500";
	} else {
		baseClassName += " border-gray-300";
	}

	if (disabled) {
		baseClassName += " bg-gray-100";
	} else {
		baseClassName += " bg-gray-50";
	}

	const className = twMerge(baseClassName, propsClassName);

	return (
		<select
			className={className}
			aria-invalid={isInvalid}
			aria-describedby={isInvalid ? errorId : undefined}
			disabled={disabled}
			required={required}
			{...rest}
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
	);
}
