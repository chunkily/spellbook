import FormContextProvider from "@/components/form/FormContextProvider";
import useFormContext from "@/components/form/useFormContext";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import Checkbox from "@/components/ui/Checkbox";
import TextAreaField from "@/components/ui/TextAreaField";
import { Form, useActionData } from "react-router-dom";

export default function ImportPage() {
	const actionData = useActionData() as
		| { errors: Record<string, string[]> }
		| undefined;

	const formContext = useFormContext({
		serverErrors: actionData?.errors,
	});

	return (
		<div>
			<FormContextProvider formContext={formContext}>
				<Form method="post">
					<p className="text-sm">Paste the JSON data to import below:</p>
					<TextAreaField
						name="data"
						label={"Import Data"}
						required
					></TextAreaField>

					<div className="mb-2">
						<Checkbox
							name="deleteExisting"
							label="Delete all existing data first?"
						/>
					</div>

					<div className="flex flex-row-reverse gap-2 max-w-lg">
						<Button type="submit">Import</Button>
						<ButtonLink to="/data" variant="secondary">
							Cancel
						</ButtonLink>
					</div>
				</Form>
			</FormContextProvider>
		</div>
	);
}
