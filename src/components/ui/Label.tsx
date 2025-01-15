import { twMerge } from "tailwind-merge";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	required?: boolean;
}

export default function Label({
	className: propClassName,
	required,
	children,
}: LabelProps) {
	if (typeof children !== "string") {
		return <>{children}</>;
	}

	const baseClassName = "mb-1 text-sm font-medium text-gray-900";
	const className = twMerge(baseClassName, propClassName);

	return (
		<label className={className}>
			{children} {required ? <span title="Required">*</span> : null}
		</label>
	);
}

export function SrOnlyLabel({
	htmlFor,
	children,
}: {
	htmlFor: string;
	children?: React.ReactNode;
}) {
	return (
		<label htmlFor={htmlFor} className="sr-only">
			{children}
		</label>
	);
}
