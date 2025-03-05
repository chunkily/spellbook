import Button from "@/components/ui/Button";
import RadioField from "@/components/ui/RadioField";
import SelectField from "@/components/ui/SelectField";
import TextField from "@/components/ui/TextField";
import { Plus } from "lucide-react";
import { Form, redirect, useActionData } from "react-router";
import useFormContext from "@/components/form/useFormContext";
import FormContextProvider from "@/components/form/FormContextProvider";
import type { Route } from "./+types/spellbooks.new";
import spellbookCreate from "@/domain/actions/spellbookCreate";
import getFormStringValue from "@/utils/getFormStringValue";
import { triggerSuccessToast } from "@/utils/toasts";

const CLASSES = [
	{
		name: "Bard",
		tradition: "Occult",
		kind: "spontaneous",
	},
	{
		name: "Cleric",
		tradition: "Divine",
		kind: "prepared",
	},
	{
		name: "Druid",
		tradition: "Primal",
		kind: "prepared",
	},
	{
		name: "Sorcerer",
		tradition: "",
		kind: "spontaneous",
	},
	{
		name: "Wizard",
		tradition: "Arcane",
		kind: "prepared",
	},
	{
		name: "Custom",
		tradition: "",
		kind: "",
	},
];

interface FormFields {
	name?: string;
	clazz?: string;
	tradition?: string;
	kind?: string;
	spellslots: {
		[level: number]: string | undefined;
	};
}

export async function clientAction({ request }: Route.ClientActionArgs) {
	const formData = await request.formData();

	const fields: FormFields = {
		name: getFormStringValue(formData, "name"),
		clazz: getFormStringValue(formData, "clazz"),
		tradition: getFormStringValue(formData, "tradition"),
		kind: getFormStringValue(formData, "kind"),
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

	const create = await spellbookCreate(fields);

	if (create.isSuccess) {
		const newId = create.getResult();
		triggerSuccessToast("Spellbook created!");
		return redirect(`/spellbooks/${newId}`);
	} else {
		return {
			fields,
			error: create.getErrorDescription(),
			errors: create.getError().errors,
		};
	}
}

export default function NewSpellbook() {
	const actionData = useActionData<{
		error: string;
		errors?: Record<string, string[]>;
		fields: FormFields;
	}>();

	const formContext = useFormContext({
		serverValues: transformFields(actionData?.fields),
		serverErrors: actionData?.errors ?? {},
	});

	const classOnChange = (value: string) => {
		const selectedClass = CLASSES.find((c) => c.name === value);
		if (selectedClass) {
			formContext.setField("clazz", selectedClass.name);
			formContext.setField("kind", selectedClass.kind);
			formContext.setField("tradition", selectedClass.tradition);
		}
	};

	return (
		<div>
			<h1 className="text-xl">New Spellbook</h1>
			<FormContextProvider formContext={formContext}>
				<Form method="post" className="max-w-lg">
					<TextField
						label="Name"
						type="text"
						name="name"
						placeholder="Enter the name of your character"
						required
					/>

					<SelectField
						label="Class"
						name="clazz"
						items={CLASSES.map((c) => ({
							value: c.name,
							label: c.name,
						}))}
						onChange={(e) => classOnChange(e.target.value)}
					>
						<option value="">Select a class</option>
					</SelectField>
					<RadioField
						label="Kind"
						name="kind"
						items={[
							{ value: "prepared", label: "Prepared" },
							{ value: "spontaneous", label: "Spontaneous" },
						]}
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
							<Plus className="w-4 h-4 mr-2" />
							Create
						</Button>
					</div>
				</Form>
			</FormContextProvider>
		</div>
	);
}

function transformFields(fields?: FormFields): Record<string, string> {
	if (!fields)
		return {
			name: "",
			clazz: "",
			tradition: "",
			kind: "",
			...Object.fromEntries(
				[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => [
					`spellslots${level}`,
					"0",
				]),
			),
		};

	return {
		name: fields.name ?? "",
		clazz: fields.clazz ?? "",
		tradition: fields.tradition ?? "",
		kind: fields.kind ?? "",
		...Object.fromEntries(
			Object.entries(fields.spellslots).map(([level, value]) => [
				`spellslots${level}`,
				value ?? "0",
			]),
		),
	};
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
