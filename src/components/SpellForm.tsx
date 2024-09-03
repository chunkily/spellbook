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
import { HeightenedEffect } from "@/domain/types/Spell";
import { Pencil, Plus } from "lucide-react";
import { Form } from "react-router-dom";
import SearchableMultiSelectField from "./ui/SearchableMultiSelectField";
import { useSearchableMultiSelectField } from "./ui/useSearchableMultiSelectField";

export interface SpellFormFields {
	name?: string;
	level?: string;
	traditions?: string[];
	traits?: string[];
	castAction?: string;
	castActionOther?: string;
	castTrigger?: string;
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
	{ value: "1", label: <span title="1 Action">◆</span> },
	{ value: "2", label: <span title="2 Actions">◆◆</span> },
	{ value: "3", label: <span title="3 Actions">◆◆◆</span> },
	{ value: "R", label: <span title="Reaction">⟳</span> },
	{ value: "13", label: <span title="1 to 3 Actions">◆ to ◆◆◆</span> },
	{ value: "12", label: <span title="1 to 2 Actions">◆ to ◆◆</span> },
	{ value: "1M", label: <span title="1 Minute">1 Minute</span> },
	{ value: "10M", label: <span title="10 Minutes">10 Minutes</span> },
	{ value: "1H", label: <span title="1 Hour">1 Hour</span> },
	{ value: "other", label: <span title="Other">Other</span> },
];

interface SpellFormProps {
	fields: SpellFormFields | undefined;
	errors: Record<string, string[]> | undefined;
	traits: string[];
	mode: "create" | "edit";
	id?: number;
}

export default function SpellForm({
	fields,
	errors,
	traits,
	mode,
	id,
}: SpellFormProps) {
	const castActionField = useRadioField({
		serverValue: fields?.castAction,
		serverErrors: errors?.castAction,
		required: true,
		validationMode: "onChange",
	});

	const isOtherCastAction = castActionField.value === "other";
	const otherCastActionField = useTextField({
		serverValue: isOtherCastAction ? fields?.castActionOther : undefined,
		serverErrors: isOtherCastAction ? errors?.castActionOther : undefined,
		validationMode: "onChange",
		required: isOtherCastAction,
	});

	const isReactionCastAction = castActionField.value === "R";
	const castTriggerField = useTextField({
		serverValue: isReactionCastAction ? fields?.castTrigger : undefined,
		serverErrors: isReactionCastAction ? errors?.castTrigger : undefined,
		validationMode: "onChange",
		required: isReactionCastAction,
	});

	const castCostOtherTextField = useTextField({
		serverValue: fields?.castCost?.other,
		serverErrors: errors?.castCost,
	});

	const castCostOtherCheckbox = useCheckbox({
		serverValue: fields?.castCost?.otherCheckbox,
		serverErrors: errors?.castCost,
	});

	return (
		<div>
			<Form method="post" className="grid grid-cols-1 gap-2 lg:grid-cols-2">
				<TextField
					label="Name"
					name="name"
					{...useTextField({
						serverValue: fields?.name,
						serverErrors: errors?.name,
						required: true,
					})}
				/>
				<SelectField
					label="Spell Level"
					name="level"
					{...useSelectField({
						serverValue: fields?.level,
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
				<SearchableMultiSelectField
					label="Traits"
					name="traits"
					{...useSearchableMultiSelectField({
						items: traits.map((trait) => ({
							value: trait,
							label: trait,
							text: trait,
						})),
						serverValues: fields?.traits,
						serverErrors: errors?.traits,
					})}
				/>
				<MultiSelectField
					label="Traditions"
					name="traditions"
					{...useMultiSelectField({
						items: TRADITIONS,
						serverValues: fields?.traditions,
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
				{isReactionCastAction ? (
					<TextField
						label="Cast Trigger"
						name="castTrigger"
						{...castTriggerField}
					/>
				) : null}
				<div className="mb-3 flex gap-2">
					<Checkbox
						label="Material"
						name="castCost.material"
						{...useCheckbox({
							serverValue: fields?.castCost?.material,
							serverErrors: errors?.castCost,
						})}
					/>
					<Checkbox
						label="Somatic"
						name="castCost.somatic"
						{...useCheckbox({
							serverValue: fields?.castCost?.somatic,
							serverErrors: errors?.castCost,
						})}
					/>
					<Checkbox
						label="Verbal"
						name="castCost.verbal"
						{...useCheckbox({
							serverValue: fields?.castCost?.verbal,
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
							serverValue: fields?.range,
							serverErrors: errors?.range,
						})}
					/>
					<TextField
						label="Area"
						name="area"
						{...useTextField({
							serverValue: fields?.area,
							serverErrors: errors?.area,
						})}
					/>
					<TextField
						label="Targets"
						name="targets"
						{...useTextField({
							serverValue: fields?.targets,
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
							serverValue: fields?.savingThrow,
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
							serverValue: fields?.duration,
							serverErrors: errors?.duration,
						})}
					/>
				</div>
				<TextAreaField
					label="Description"
					name="description"
					rows={8}
					{...useTextAreaField({
						serverValue: fields?.description,
						serverErrors: errors?.description,
						required: true,
					})}
				/>
				<HeightenedEffectsField
					name="heightenedEffects"
					serverValues={fields?.heightenedEffects}
					serverErrors={errors?.heightenedEffects}
				/>
				<div className="lg:col-span-2"></div>

				{mode === "create" ? (
					<div className="flex flex-row-reverse gap-2 max-w-lg lg:col-start-2 lg:col-end-2">
						<Button type="submit">
							<Plus className="w-4 h-4 mr-2" />
							Add Spell To Global List
						</Button>
						<ButtonLink to={`/spells/`} variant="secondary">
							Cancel
						</ButtonLink>
					</div>
				) : null}
				{mode === "edit" ? (
					<div className="flex flex-row-reverse gap-2 max-w-lg lg:col-start-2 lg:col-end-2">
						<Button type="submit">
							<Pencil className="w-4 h-4 mr-2" />
							Edit
						</Button>
						<ButtonLink to={`/spells/${id}`} variant="secondary">
							Cancel
						</ButtonLink>
					</div>
				) : null}
			</Form>
		</div>
	);
}

