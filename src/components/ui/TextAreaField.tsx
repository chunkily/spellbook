import { useId } from "react";
import { twMerge } from "tailwind-merge";
import ErrorList from "./ErrorList";

interface TextAreaFieldProps
	extends Omit<
		React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		"defaultValue"
	> {
	name: string;
	value: string;
	onValueChange: (value: string) => void;
	charCount?: number;
	label: React.ReactNode;
	errors?: string[];
	textAreaClassName?: string;
}

export default function TextAreaField({
	className: propClassName,
	textAreaClassName: propTextAreaClassName,
	label,
	id,
	errors,
	disabled,
	required,
	charCount,
	maxLength,
	rows = 3,
	onValueChange,
	onChange: propsOnChange,
	...rest
}: TextAreaFieldProps) {
	const fallbackId = useId();
	id = id || fallbackId;

	const hasErrors = errors && errors.length > 0;
	const errorId = `${id}-error`;

	const baseClassName = "mb-3 max-w-lg";

	const className = twMerge(baseClassName, propClassName);

	let baseInputClassName = "w-full px-3 py-2 border rounded-md";

	if (hasErrors) {
		baseInputClassName += " border-red-500";
	} else {
		baseInputClassName += " border-gray-300";
	}

	if (disabled) {
		baseInputClassName += " bg-gray-100";
	}

	const textAreaClassName = twMerge(baseInputClassName, propTextAreaClassName);

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		onValueChange(e.target.value);

		if (propsOnChange) {
			propsOnChange(e);
		}
	};

	return (
		<div className={className}>
			<div className="flex flex-row justify-between">
				<label className="block" htmlFor={id}>
					{label} {required ? <span title="Required">*</span> : null}
				</label>
				{charCount !== undefined && maxLength ? (
					<div className="text-right">
						<span className="text-gray-500 text-sm">
							{charCount}/{maxLength}
						</span>
					</div>
				) : null}
			</div>

			<textarea
				id={id}
				className={textAreaClassName}
				aria-invalid={hasErrors}
				aria-describedby={hasErrors ? errorId : undefined}
				disabled={disabled}
				required={required}
				rows={rows}
				maxLength={maxLength}
				onChange={onChange}
				{...rest}
			/>
			{hasErrors ? <ErrorList id={errorId} errors={errors} /> : null}
		</div>
	);
}
