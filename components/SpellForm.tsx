import HeightenedEffectsField, {
	transformHeightenedEffectsToJson,
} from "@/components/HeightenedEffectsField";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import Checkbox from "@/components/ui/Checkbox";
import RadioField from "@/components/ui/RadioField";
import SelectField from "@/components/ui/SelectField";
import TextAreaField from "@/components/ui/TextAreaField";
import TextField from "@/components/ui/TextField";
import type HeightenedEffect from "@/domain/types/HeightenedEffect";
import { Pencil, Plus } from "lucide-react";
import { Form } from "react-router";
import SearchableMultiSelectField from "./ui/SearchableMultiSelectField";
import TRADITIONS from "@/domain/types/Traditions";
import useFormContext from "@/components/form/useFormContext";
import FormContextProvider from "@/components/form/FormContextProvider";

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

const TRADITION_OPTIONS = TRADITIONS.map((tradition) => ({
	value: tradition,
	label: tradition,
	text: tradition,
}));

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
	id?: string;
}

export default function SpellForm({
	fields,
	errors,
	traits,
	mode,
	id,
}: SpellFormProps) {
	const formContext = useFormContext({
		serverValues: {
			...fields,
			heightenedEffects: transformHeightenedEffectsToJson(
				fields?.heightenedEffects,
			),
		},
		serverErrors: errors,
	});

	const isOtherCastAction = formContext.getField("castAction") === "other";

	const isReactionCastAction = formContext.getField("castAction") === "R";

	const isCastCostOtherCheckboxChecked = formContext.getBooleanField(
		"castCost.otherCheckbox",
	);

	return (
		<div>
			<FormContextProvider formContext={formContext}>
				<Form method="post" className="grid grid-cols-1 gap-2 lg:grid-cols-2">
					<TextField label="Name" name="name" required />
					<SelectField label="Spell Level" name="level">
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
						items={traits.map((trait) => ({
							value: trait,
							label: trait,
							text: trait,
						}))}
					/>
					<SearchableMultiSelectField
						label="Traditions"
						name="traditions"
						items={TRADITION_OPTIONS}
					/>
					<RadioField
						label="Cast"
						name="castAction"
						items={CAST_ACTIONS}
						required
					></RadioField>
					{isOtherCastAction ? (
						<TextField label="Cast Action" name="castActionOther" required />
					) : null}
					{isReactionCastAction ? (
						<TextField label="Cast Trigger" name="castTrigger" required />
					) : null}
					<div className="mb-3 flex gap-2">
						<Checkbox label="Material" name="castCost.material" />
						<Checkbox label="Somatic" name="castCost.somatic" />
						<Checkbox label="Verbal" name="castCost.verbal" />
						<Checkbox label="Other" name="castCost.otherCheckbox" />
						{isCastCostOtherCheckboxChecked ? (
							<TextField label="Extra Costs" name="castCost.other" />
						) : null}
					</div>
					<div className="max-w-lg flex gap-2">
						<TextField label="Range" name="range" />
						<TextField label="Area" name="area" />
						<TextField label="Targets" name="targets" />
					</div>
					<div className="max-w-lg flex gap-2">
						<SelectField
							className="flex-1"
							label="Saving Throw"
							name="savingThrow"
						>
							<option value=""></option>
							<option value="Fortitude">Fortitude</option>
							<option value="Reflex">Reflex</option>
							<option value="Will">Will</option>
						</SelectField>
						<TextField className="flex-1" label="Duration" name="duration" />
					</div>
					<TextAreaField
						label="Description"
						name="description"
						rows={8}
						required
					/>
					<HeightenedEffectsField name="heightenedEffects" />
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
			</FormContextProvider>
		</div>
	);
}
