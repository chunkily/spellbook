import Button from "@/components/ui/Button";
import RadioField from "@/components/ui/RadioField";
import TextField from "@/components/ui/TextField";
import { Save } from "lucide-react";
import { Form, useActionData, useLoaderData } from "react-router";
import { FormFields } from "./action";
import useFormContext from "@/components/form/useFormContext";
import FormContextProvider from "@/components/form/FormContextProvider";

function transformFields(
	loaderFields: FormFields,
	actionFields: FormFields | undefined,
): Record<string, string> {
	return {
		name: actionFields?.name ?? loaderFields.name ?? "",
	};
}

export default function EditSpellbook() {
	const loaderData = useLoaderData<FormFields>();

	const actionData = useActionData<{
		error: string;
		fields: FormFields;
	}>();

	const formContext = useFormContext({
		serverValues: transformFields(loaderData, actionData?.fields),
	});

	return (
		<div>
			<h1 className="text-xl">Edit Spellbook</h1>
			<FormContextProvider formContext={formContext}>
				<Form method="post" className="max-w-lg">
					<TextField label="Name" name="name" disabled />
					<RadioField
						label="Kind"
						name="kind"
						items={[
							{ value: "prepared", label: "Prepared" },
							{ value: "spontaneous", label: "Spontaneous" },
						]}
						disabled
					/>
					<RadioField
						label="Tradition"
						name="tradition"
						items={[
							{ value: "Arcane", label: "Arcane" },
							{ value: "Divine", label: "Divine" },
							{ value: "Occult", label: "Occult" },
							{ value: "Primal", label: "Primal" },
						]}
						disabled
					/>
					<div className="mb-3">
						<fieldset>
							<legend>Spell slots</legend>
							<p className="text-sm mb-2 text-gray-700">
								Enter the number of spell slots you have for each spell level.
							</p>
							<div className="flex flex-wrap gap-1 max-w-lg">
								<SpellSlotField level={0} />
								{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
									<SpellSlotField key={level} level={level} />
								))}
							</div>
						</fieldset>
					</div>
					{actionData?.error ? (
						<div className="text-red-500">{actionData.error}</div>
					) : null}
					<div className="flex justify-end">
						<Button type="submit">
							<Save className="w-4 h-4 mr-2" />
							Save
						</Button>
					</div>
				</Form>
			</FormContextProvider>
		</div>
	);
}

function SpellSlotField({ level }: { level: number }) {
	const isCantrip = level === 0;

	return (
		<div>
			<TextField
				className="w-24"
				label={isCantrip ? "Cantrip" : `Spell ${level}`}
				type="number"
				name={`spellslots${level}`}
			/>
		</div>
	);
}
