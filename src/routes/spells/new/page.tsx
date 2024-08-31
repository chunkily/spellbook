import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import MultiSelectField from "@/components/MultiSelectField";
import SelectField from "@/components/SelectField";
import TextAreaField from "@/components/TextAreaField";
import TextField from "@/components/TextField";
import useSelectField from "@/components/useSelectField";
import useMultiSelectField from "@/components/useMultiSelectField";
import useTextAreaField from "@/components/useTextAreaField";
import useTextField from "@/components/useTextField";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import RadioField from "@/components/RadioField";
import useRadioField from "@/components/useRadioField";
import Checkbox from "@/components/Checkbox";
import useCheckbox from "@/components/useCheckbox";

interface FormFields {
	name?: string;
	level?: string;
	traditions?: string[];
	traits?: string[];
	castAction?: string;
	castCost?: {
		somatic: boolean;
		material: boolean;
		verbal: boolean;
		other?: string;
	};
	range?: string;
	area?: string;
	targets?: string;
	savingThrow?: string;
	duration?: string;
	description?: string;
}

const TRADITIONS = [
	{ value: "Arcane", label: "Arcane" },
	{ value: "Divine", label: "Divine" },
	{ value: "Occult", label: "Occult" },
	{ value: "Primal", label: "Primal" },
];

const CAST_ACTIONS = [
	{ value: "◆", label: <span title="1 Action">◆</span> },
	{ value: "◆◆", label: <span title="2 Actions">◆◆</span> },
	{ value: "◆◆◆", label: <span title="3 Actions">◆◆◆</span> },
	{ value: "⟳", label: <span title="Reaction">⟳</span> },
	{ value: "◆ to ◆◆◆", label: <span title="1 to 3 Actions">◆ to ◆◆◆</span> },
	{ value: "◆ to ◆◆", label: <span title="1 to 2 Actions">◆ to ◆◆</span> },
	{ value: "1 Minute", label: <span title="1 Minute">1 Minute</span> },
	{ value: "10 Minutes", label: <span title="10 Minutes">10 Minutes</span> },
	{ value: "1 Hour", label: <span title="1 Hour">1 Hour</span> },
	{ value: "other", label: <span title="Other">Other</span> },
];

export default function Page() {
	const { traits } = useLoaderData() as { traits: string[] };
	const actionData = useActionData() as
		| {
				error: string;
				errors?: Record<string, string[]>;
				fields: FormFields;
		  }
		| undefined;

	const castActionField = useRadioField({
		serverValue: actionData?.fields.castAction,
		serverErrors: actionData?.errors?.castAction,
	});

	const isOtherCastAction = castActionField.value === "other";
	const otherCastActionField = useTextField({
		serverValue: isOtherCastAction ? actionData?.fields.castAction : undefined,
		serverErrors: isOtherCastAction
			? actionData?.errors?.castAction
			: undefined,
		validationMode: "onChange",
		required: isOtherCastAction,
	});

	return (
		<div>
			<h1 className="text-xl">Add New Spell</h1>
			<Form method="post" className="grid grid-cols-1 gap-2 lg:grid-cols-2">
				<TextField
					label="Name"
					name="name"
					{...useTextField({
						serverValue: actionData?.fields.name,
						serverErrors: actionData?.errors?.name,
						required: true,
					})}
				/>
				<SelectField
					label="Spell Level"
					name="level"
					{...useSelectField({
						serverValue: actionData?.fields.level ?? "1",
						serverErrors: actionData?.errors?.level,
					})}
				>
					<option value="0">Cantrip 1</option>
					<option value="1">Spell 1</option>
					<option value="2">Spell 2</option>
					<option value="3">Spell 3</option>
					<option value="4">Spell 4</option>
					<option value="5">Spell 5</option>
					<option value="6">Spell 6</option>
					<option value="7">Spell 7</option>
					<option value="8">Spell 8</option>
					<option value="9">Spell 9</option>
					<option value="10">Spell 10</option>
				</SelectField>
				<MultiSelectField
					label="Traits"
					name="traits"
					{...useMultiSelectField({
						items: traits.map((trait) => ({ value: trait, label: trait })),
						serverValues: actionData?.fields.traits,
						serverErrors: actionData?.errors?.traits,
					})}
				/>
				<MultiSelectField
					label="Traditions"
					name="traditions"
					{...useMultiSelectField({
						items: TRADITIONS,
						serverValues: actionData?.fields.traditions,
						serverErrors: actionData?.errors?.traditions,
					})}
				/>
				<RadioField
					label="Cast"
					name="castAction"
					items={CAST_ACTIONS}
					{...castActionField}
				></RadioField>
				{isOtherCastAction ? (
					<TextField
						label="Cast Action"
						name="castActionOther"
						{...otherCastActionField}
					/>
				) : null}
				<div className="mb-3 flex gap-2">
					<Checkbox
						label="Material"
						name="castCost.material"
						{...useCheckbox({
							serverValue: actionData?.fields.castCost?.material,
							serverErrors: actionData?.errors?.castCost,
						})}
					/>
					<Checkbox
						label="Somatic"
						name="castCost.somatic"
						{...useCheckbox({
							serverValue: actionData?.fields.castCost?.somatic,
							serverErrors: actionData?.errors?.castCost,
						})}
					/>
					<Checkbox
						label="Verbal"
						name="castCost.verbal"
						{...useCheckbox({
							serverValue: actionData?.fields.castCost?.verbal,
							serverErrors: actionData?.errors?.castCost,
						})}
					/>
					<TextField
						label="Extra Costs"
						name="castCost.other"
						{...useTextField({
							serverValue: actionData?.fields.castCost?.other,
							serverErrors: actionData?.errors?.castCost,
						})}
					/>
				</div>
				<div className="max-w-lg flex gap-2">
					<TextField
						label="Range"
						name="range"
						{...useTextField({
							serverValue: actionData?.fields.range,
							serverErrors: actionData?.errors?.range,
						})}
					/>
					<TextField
						label="Area"
						name="area"
						{...useTextField({
							serverValue: actionData?.fields.area,
							serverErrors: actionData?.errors?.area,
						})}
					/>
					<TextField
						label="Targets"
						name="targets"
						{...useTextField({
							serverValue: actionData?.fields.targets,
							serverErrors: actionData?.errors?.targets,
						})}
					/>
				</div>
				<div className="max-w-lg flex gap-2">
					<SelectField
						className="flex-1"
						label="Saving Throw"
						name="savingThrow"
						{...useSelectField({
							serverValue: actionData?.fields.savingThrow,
							serverErrors: actionData?.errors?.savingThrow,
						})}
					>
						<option value=""></option>
						<option value="Fortitude">Fortitude</option>
						<option value="Reflex">Reflex</option>
						<option value="Will">Will</option>
					</SelectField>
					<TextField
						className="flex-1"
						label="Duration"
						name="duration"
						{...useTextField({
							serverValue: actionData?.fields.duration,
							serverErrors: actionData?.errors?.duration,
						})}
					/>
				</div>

				<TextAreaField
					label="Description"
					name="description"
					rows={8}
					{...useTextAreaField({
						serverValue: actionData?.fields.description,
						serverErrors: actionData?.errors?.description,
						required: true,
					})}
				/>
				<div className="lg:col-span-2"></div>
				<div className="flex flex-row-reverse gap-2 max-w-lg lg:col-start-2 lg:col-end-2">
					<Button type="submit">Add Spell To Global List</Button>
					<ButtonLink to={`/spells/`} variant="secondary">
						Cancel
					</ButtonLink>
				</div>
			</Form>
		</div>
	);
}
