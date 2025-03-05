import useFormContext from "@/components/form/useFormContext";
import type { Route } from "./+types/data.import._index";
import FormContextProvider from "@/components/form/FormContextProvider";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import Checkbox from "@/components/ui/Checkbox";
import TextAreaField from "@/components/ui/TextAreaField";
import { Form, redirect } from "react-router";
import type Spell from "@/domain/types/Spell";
import type Spellbook from "@/domain/types/Spellbook";
import getFormStringValue from "@/utils/getFormStringValue";
import importData from "@/domain/actions/importData";
import { triggerSuccessToast } from "@/utils/toasts";

interface Data {
	spells?: Spell[];
	spellbooks?: Spellbook[];
	traits?: string[];
}

export async function clientAction({ request }: Route.ClientActionArgs) {
	const formData = await request.formData();

	let data: Data;

	try {
		const dataJson = getFormStringValue(formData, "data");
		data = parseData(dataJson);
	} catch (err) {
		console.error(err);
		return {
			errors: {
				data: ["Invalid data provided."],
			},
		};
	}

	const deleteExisting =
		getFormStringValue(formData, "deleteExisting") === "true";

	const op = await importData({
		...data,
		deleteExisting,
	});

	if (op.isSuccess) {
		triggerSuccessToast("Data imported successfully.");
		return redirect("/data");
	}

	return {
		errors: {
			data: [op.getErrorDescription()],
		},
	};
}

function parseData(dataJson: string | undefined): Data {
	const data = JSON.parse(dataJson || "{}") as unknown;

	// Check that the data conforms to the expected format
	if (typeof data !== "object" || data === null) {
		throw new Error("Data must be an object.");
	}

	return data;
}

export default function ImportPage({ actionData }: Route.ComponentProps) {
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
