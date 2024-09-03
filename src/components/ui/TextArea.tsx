import { twMerge } from "tailwind-merge";

interface TextAreaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	isInvalid?: boolean;
	errorId?: string;
}

export default function TextArea({
	isInvalid,
	errorId,
	className: propsClassName,
	disabled,
	required,
	...rest
}: TextAreaProps) {
	let baseClassName =
		"block p-2.5 w-full text-sm text-gray-900 rounded-lg border focus:ring-blue-500 focus:border-blue-500";

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
		<textarea
			className={className}
			aria-invalid={isInvalid}
			aria-describedby={isInvalid ? errorId : undefined}
			disabled={disabled}
			required={required}
			{...rest}
		/>
	);
}
