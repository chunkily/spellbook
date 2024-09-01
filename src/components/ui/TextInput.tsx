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
	let baseClassName = "w-full px-3 py-2 border rounded-md";

	if (isInvalid) {
		baseClassName += " border-red-500";
	} else {
		baseClassName += " border-gray-300";
	}

	if (disabled) {
		baseClassName += " bg-gray-100";
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
