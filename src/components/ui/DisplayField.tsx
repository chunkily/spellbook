import useFormField from "../form/useFormField";
import Label from "./Label";

interface DisplayFieldProps {
	label: string;
	name?: string;
	children: React.ReactNode;
}

export default function DisplayField({
	label,
	name,
	children,
}: DisplayFieldProps) {
	const field = useFormField(name ?? "");

	return (
		<div className="flex mb-3 h-10">
			<Label>{label}</Label>
			<div>
				{field.value}
				{children}
			</div>
		</div>
	);
}
