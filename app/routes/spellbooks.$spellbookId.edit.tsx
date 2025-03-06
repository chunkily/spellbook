import Button from "@/components/ui/Button";
import RadioField from "@/components/ui/RadioField";
import TextField from "@/components/ui/TextField";
import { Save } from "lucide-react";
import { Form } from "react-router";
import useFormContext from "@/components/form/useFormContext";
import FormContextProvider from "@/components/form/FormContextProvider";
import { redirect } from "react-router";
import getFormStringValue from "@/utils/getFormStringValue";
import spellbookEdit from "@/domain/actions/spellbookEdit";
import { triggerSuccessToast } from "@/utils/toasts";
import type { Route } from "./+types/spellbooks.$spellbookId.edit";
import spellbookGetById from "@/domain/actions/spellbookGetById";

interface FormFields {
	id: string;
	name: string;
	kind: string;
	tradition: string;
	spellslots: {
		[level: number]: string | undefined;
	};
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
	const spellbookId = params.spellbookId;
	const spellbook = await spellbookGetById(spellbookId);

	if (!spellbook) {
		throw new Error("Spellbook not found");
	}

	const fields: FormFields = {
		id: spellbook.id,
		name: spellbook.name,
		kind: spellbook.kind,
		tradition: spellbook.tradition,
		spellslots: {
			0: spellbook.spellSlots[0].length.toString(),
			1: spellbook.spellSlots[1].length.toString(),
			2: spellbook.spellSlots[2].length.toString(),
			3: spellbook.spellSlots[3].length.toString(),
			4: spellbook.spellSlots[4].length.toString(),
			5: spellbook.spellSlots[5].length.toString(),
			6: spellbook.spellSlots[6].length.toString(),
			7: spellbook.spellSlots[7].length.toString(),
			8: spellbook.spellSlots[8].length.toString(),
			9: spellbook.spellSlots[9].length.toString(),
			10: spellbook.spellSlots[10].length.toString(),
		},
	};

	return {
		fields,
	};
}

export async function clientAction({
	request,
	params,
}: Route.ClientActionArgs) {
	const spellbookId = params.spellbookId;

	const formData = await request.formData();

	const fields: FormFields = {
		id: spellbookId,
		name: "",
		kind: "",
		tradition: "",
		spellslots: {
			0: getFormStringValue(formData, "spellslots0"),
			1: getFormStringValue(formData, "spellslots1"),
			2: getFormStringValue(formData, "spellslots2"),
			3: getFormStringValue(formData, "spellslots3"),
			4: getFormStringValue(formData, "spellslots4"),
			5: getFormStringValue(formData, "spellslots5"),
			6: getFormStringValue(formData, "spellslots6"),
			7: getFormStringValue(formData, "spellslots7"),
			8: getFormStringValue(formData, "spellslots8"),
			9: getFormStringValue(formData, "spellslots9"),
			10: getFormStringValue(formData, "spellslots10"),
		},
	};

	const update = await spellbookEdit(fields);

	if (update.isSuccess) {
		triggerSuccessToast("Spellbook updated");
		return redirect(`/spellbooks/${spellbookId}`);
	} else {
		return {
			fields,
			error: update.getErrorDescription(),
		};
	}
}

export default function EditSpellbookPage({
	loaderData,
	actionData,
}: Route.ComponentProps) {
	const formContext = useFormContext({
		serverValues: transformFields(loaderData.fields, actionData?.fields),
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

function transformFields(
	loaderFields: FormFields,
	actionFields: FormFields | undefined,
): Record<string, string> {
	return {
		name: loaderFields.name,
		kind: loaderFields.kind,
		tradition: loaderFields.tradition,
		spellslots0:
			actionFields?.spellslots[0] || loaderFields.spellslots[0] || "0",
		spellslots1:
			actionFields?.spellslots[1] || loaderFields.spellslots[1] || "0",
		spellslots2:
			actionFields?.spellslots[2] || loaderFields.spellslots[2] || "0",
		spellslots3:
			actionFields?.spellslots[3] || loaderFields.spellslots[3] || "0",
		spellslots4:
			actionFields?.spellslots[4] || loaderFields.spellslots[4] || "0",
		spellslots5:
			actionFields?.spellslots[5] || loaderFields.spellslots[5] || "0",
		spellslots6:
			actionFields?.spellslots[6] || loaderFields.spellslots[6] || "0",
		spellslots7:
			actionFields?.spellslots[7] || loaderFields.spellslots[7] || "0",
		spellslots8:
			actionFields?.spellslots[8] || loaderFields.spellslots[8] || "0",
		spellslots9:
			actionFields?.spellslots[9] || loaderFields.spellslots[9] || "0",
		spellslots10:
			actionFields?.spellslots[10] || loaderFields.spellslots[10] || "0",
	};
}
