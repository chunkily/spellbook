import { useId } from "react";
import { twMerge } from "tailwind-merge";
import ErrorList from "./ErrorList";
import TextArea from "./TextArea";
import useFormField from "../form/useFormField";
import Label from "./Label";

interface TextAreaFieldProps
	extends Omit<
		React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		"defaultValue"
	> {
	name: string;
	charCount?: number;
	label: React.ReactNode;
	textAreaClassName?: string;
}

export default function TextAreaField({
	className: propClassName,
	textAreaClassName,
	label,
	id,
	name,
	required,
	charCount,
	maxLength,
	rows = 3,
	onChange: propsOnChange,
	...rest
}: TextAreaFieldProps) {
	const fallbackId = useId();
	id = id || fallbackId;

	const field = useFormField(name);
	const errors = field.errors;

	const hasErrors = errors && errors.length > 0;
	const errorId = `${id}-error`;

	const baseClassName = "mb-3 max-w-lg";

	const className = twMerge(baseClassName, propClassName);

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		field.onValueChange(e.target.value);

		if (required && !e.target.value) {
			field.setErrors(["This field is required"]);
		} else {
			field.setErrors([]);
		}

		if (propsOnChange) {
			propsOnChange(e);
		}
	};

	return (
		<div className={className}>
			<div className="flex flex-row justify-between">
				<Label htmlFor={id} required={required}>
					{label}
				</Label>
				{charCount !== undefined && maxLength ? (
					<div className="text-right">
						<span className="text-gray-500 text-sm">
							{charCount}/{maxLength}
						</span>
					</div>
				) : null}
			</div>

			<TextArea
				id={id}
				name={name}
				className={textAreaClassName}
				isInvalid={hasErrors}
				errorId={errorId}
				required={required}
				rows={rows}
				maxLength={maxLength}
				onChange={onChange}
				value={field.value}
				{...rest}
			/>
			{hasErrors ? <ErrorList id={errorId} errors={errors} /> : null}
		</div>
	);
}

