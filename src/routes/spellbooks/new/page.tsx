import Button from "@/components/ui/Button";
import RadioField from "@/components/ui/RadioField";
import SelectField from "@/components/ui/SelectField";
import TextField from "@/components/ui/TextField";
import useRadioField from "@/components/ui/useRadioField";
import useSelectField from "@/components/ui/useSelectField";
import useTextField from "@/components/ui/useTextField";
import { Plus } from "lucide-react";
import { Form, useActionData } from "react-router-dom";
import { FormFields } from "./action";

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

export default function NewSpellbook() {
	const actionData = useActionData() as
		| {
				error: string;
				errors?: Record<string, string[]>;
				fields: FormFields;
		  }
		| undefined;

	const classSelectField = useSelectField({
		serverValue: actionData?.fields.clazz,
		serverErrors: actionData?.errors?.clazz,
	});

	const kindRadioField = useRadioField({
		serverValue: actionData?.fields.kind,
		serverErrors: actionData?.errors?.kind,
		required: true,
	});

	const traditionRadioField = useRadioField({
		serverValue: actionData?.fields.tradition,
		serverErrors: actionData?.errors?.tradition,
		required: true,
	});

	const classOnChange = (value: string) => {
		const selectedClass = CLASSES.find((c) => c.name === value);
		if (selectedClass) {
			classSelectField.onValueChange(value);
			kindRadioField.onValueChange(selectedClass.kind);
			traditionRadioField.onValueChange(selectedClass.tradition);
		}
	};

	return (
		<div>
			<h1 className="text-xl">New Spellbook</h1>
			<Form method="post" className="max-w-lg">
				<TextField
					label="Name"
					type="text"
					name="name"
					placeholder="Enter the name of your character"
					{...useTextField({
						serverValue: actionData?.fields.name,
						serverErrors: actionData?.errors?.name,
						required: true,
					})}
				/>

				<SelectField
					label="Class"
					name="clazz"
					items={CLASSES.map((c) => ({
						value: c.name,
						label: c.name,
					}))}
					{...classSelectField}
					onValueChange={classOnChange} // Overriding the default onValueChange
				>
					<option value="">Select a class</option>
				</SelectField>
				<RadioField
					label="Kind"
					name="kind"
					onChange={() => classSelectField.onValueChange("Custom")}
					items={[
						{ value: "prepared", label: "Prepared" },
						{ value: "spontaneous", label: "Spontaneous" },
					]}
					{...kindRadioField}
				/>
				<RadioField
					label="Tradition"
					name="tradition"
					onChange={() => classSelectField.onValueChange("Custom")}
					items={[
						{ value: "Arcane", label: "Arcane" },
						{ value: "Divine", label: "Divine" },
						{ value: "Occult", label: "Occult" },
						{ value: "Primal", label: "Primal" },
					]}
					{...traditionRadioField}
				/>
				<div className="mb-3">
					<fieldset>
						<legend>Spell slots</legend>
						<p className="text-sm mb-2 text-gray-700">
							Enter the number of spell slots you have for each spell level.
						</p>
						<div className="flex flex-wrap gap-1 max-w-lg">
							<SpellSlotField
								serverValue={actionData?.fields.spellslots[0] ?? "5"}
								level={0}
							/>
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
								<SpellSlotField
									key={level}
									serverValue={actionData?.fields.spellslots[level] ?? "0"}
									serverErrors={actionData?.errors?.[`spellslots${level}`]}
									level={level}
								/>
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
		</div>
	);
}

function SpellSlotField({
	serverValue,
	serverErrors,
	level,
}: {
	serverValue: string;
	serverErrors?: string[];
	level: number;
}) {
	const spellSlotField = useTextField({
		serverValue,
		serverErrors,
	});

	const isCantrip = level === 0;

	return (
		<div>
			<TextField
				className="w-24"
				label={isCantrip ? "Cantrip" : `Spell ${level}`}
				type="number"
				name={`spellslots${level}`}
				{...spellSlotField}
			/>
		</div>
	);
}
