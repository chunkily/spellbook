import { twMerge } from "tailwind-merge";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	isInvalid?: boolean;
	errorId?: string;
}

export default function TextInput({
	isInvalid,
	errorId,
	className: propsClassName,
	disabled,
	required,
	...rest
}: TextInputProps) {
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
		<input
			className={className}
			aria-invalid={isInvalid}
			aria-describedby={isInvalid ? errorId : undefined}
			disabled={disabled}
			required={required}
			{...rest}
		/>
	);
}
