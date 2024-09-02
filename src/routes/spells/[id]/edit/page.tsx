import HeightenedEffectsField from "@/components/HeightenedEffectsField";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import Checkbox from "@/components/ui/Checkbox";
import MultiSelectField from "@/components/ui/MultiSelectField";
import RadioField from "@/components/ui/RadioField";
import SelectField from "@/components/ui/SelectField";
import TextAreaField from "@/components/ui/TextAreaField";
import TextField from "@/components/ui/TextField";
import useCheckbox from "@/components/ui/useCheckbox";
import useMultiSelectField from "@/components/ui/useMultiSelectField";
import useRadioField from "@/components/ui/useRadioField";
import useSelectField from "@/components/ui/useSelectField";
import useTextAreaField from "@/components/ui/useTextAreaField";
import useTextField from "@/components/ui/useTextField";
import Spell, { HeightenedEffect } from "@/domain/types/Spell";
import { Form, useActionData, useLoaderData } from "react-router-dom";

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
		otherCheckbox: boolean;
		other?: string;
	};
	range?: string;
	area?: string;
	targets?: string;
	savingThrow?: string;
	duration?: string;
	description?: string;
	heightenedEffects?: HeightenedEffect[];
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

export default function SpellEditPage() {
	const { spell, traits } = useLoaderData() as {
		spell: Spell;
		traits: string[];
	};
	const actionData = useActionData() as
		| {
				error: string;
				errors?: Record<string, string[]>;
				fields: FormFields;
		  }
		| undefined;

	// Merge the server data with the default values
	const fields: FormFields = {
		name: actionData?.fields.name ?? spell.name,
		level: actionData?.fields.level ?? spell.level.toString(),
		traits: actionData?.fields.traits ?? spell.traits,
		traditions: actionData?.fields.traditions ?? spell.traditions,
		castAction: actionData?.fields.castAction ?? spell.castAction,
		castCost: {
			somatic: actionData?.fields.castCost?.somatic ?? spell.castCost.somatic,
			material:
				actionData?.fields.castCost?.material ?? spell.castCost.material,
			verbal: actionData?.fields.castCost?.verbal ?? spell.castCost.verbal,
			otherCheckbox:
				actionData?.fields.castCost?.otherCheckbox ??
				spell.castCost.other !== "",
			other: actionData?.fields.castCost?.other ?? spell.castCost.other,
		},
		range: actionData?.fields.range ?? spell.range,
		area: actionData?.fields.area ?? spell.area,
		targets: actionData?.fields.targets ?? spell.targets,
		savingThrow: actionData?.fields.savingThrow ?? spell.savingThrow,
		duration: actionData?.fields.duration ?? spell.duration,
		description: actionData?.fields.description ?? spell.description,
		heightenedEffects:
			actionData?.fields.heightenedEffects ?? spell.heightenedEffects,
	};

	const errors = actionData?.errors;

	const castActionField = useRadioField({
		serverValue: fields.castAction,
		serverErrors: errors?.castAction,
		required: true,
		validationMode: "onChange",
	});

	// TODO: Handle this
	const isOtherCastAction = castActionField.value === "other";
	const otherCastActionField = useTextField({
		serverValue: isOtherCastAction ? fields.castAction : undefined,
		serverErrors: isOtherCastAction ? errors?.castAction : undefined,
		validationMode: "onChange",
		required: isOtherCastAction,
	});

	const castCostOtherTextField = useTextField({
		serverValue: fields.castCost?.other,
		serverErrors: errors?.castCost,
	});

	const castCostOtherCheckbox = useCheckbox({
		serverValue: fields.castCost?.otherCheckbox,
		serverErrors: errors?.castCost,
	});

	return (
		<div>
			<Form method="post">
				<h1>Add New Spell</h1>
				<TextField
					label="Name"
					name="name"
					{...useTextField({
						serverValue: fields.name,
						serverErrors: errors?.name,
						required: true,
					})}
				/>
				<SelectField
					label="Spell Level"
					name="level"
					{...useSelectField({
						serverValue: fields.level,
						serverErrors: errors?.level,
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
						serverValues: fields.traits,
						serverErrors: errors?.traits,
					})}
				/>
				<MultiSelectField
					label="Traditions"
					name="traditions"
					{...useMultiSelectField({
						items: TRADITIONS,
						serverValues: fields.traditions,
						serverErrors: errors?.traditions,
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
							serverValue: fields.castCost?.material,
							serverErrors: errors?.castCost,
						})}
					/>
					<Checkbox
						label="Somatic"
						name="castCost.somatic"
						{...useCheckbox({
							serverValue: fields.castCost?.somatic,
							serverErrors: errors?.castCost,
						})}
					/>
					<Checkbox
						label="Verbal"
						name="castCost.verbal"
						{...useCheckbox({
							serverValue: fields.castCost?.verbal,
							serverErrors: errors?.castCost,
						})}
					/>
					<Checkbox
						label="Other"
						name="castCost.otherCheckbox"
						{...castCostOtherCheckbox}
					/>
					{castCostOtherCheckbox.checked ? (
						<TextField
							label="Extra Costs"
							name="castCost.other"
							{...castCostOtherTextField}
						/>
					) : null}
				</div>
				<div className="max-w-lg flex gap-2">
					<TextField
						label="Range"
						name="range"
						{...useTextField({
							serverValue: fields.range,
							serverErrors: errors?.range,
						})}
					/>
					<TextField
						label="Area"
						name="area"
						{...useTextField({
							serverValue: fields.area,
							serverErrors: errors?.area,
						})}
					/>
					<TextField
						label="Targets"
						name="targets"
						{...useTextField({
							serverValue: fields.targets,
							serverErrors: errors?.targets,
						})}
					/>
				</div>
				<div className="max-w-lg flex gap-2">
					<SelectField
						className="flex-1"
						label="Saving Throw"
						name="savingThrow"
						{...useSelectField({
							serverValue: fields.savingThrow,
							serverErrors: errors?.savingThrow,
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
							serverValue: fields.duration,
							serverErrors: errors?.duration,
						})}
					/>
				</div>
				<TextAreaField
					label="Description"
					name="description"
					rows={8}
					{...useTextAreaField({
						serverValue: fields.description,
						serverErrors: errors?.description,
						required: true,
					})}
				/>
				<HeightenedEffectsField
					name="heightenedEffects"
					serverValues={fields.heightenedEffects}
					serverErrors={errors?.heightenedEffects}
				/>
				<div className="lg:col-span-2"></div>
				<div className="flex flex-row-reverse gap-2 max-w-lg">
					<Button type="submit">Edit</Button>
					<ButtonLink to={`/spells/${spell.id}`} variant="secondary">
						Cancel
					</ButtonLink>
				</div>
			</Form>
		</div>
	);
}
