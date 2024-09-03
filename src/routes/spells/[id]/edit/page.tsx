import SpellForm, { SpellFormFields } from "@/components/SpellForm";
import Spell from "@/domain/types/Spell";
import { useActionData, useLoaderData } from "react-router-dom";

export default function SpellEditPage() {
	const { spell, traits } = useLoaderData() as {
		spell: Spell;
		traits: string[];
	};
	const actionData = useActionData() as
		| {
				error: string;
				errors?: Record<string, string[]>;
				fields: SpellFormFields;
		  }
		| undefined;

	const submittedFields = actionData?.fields;

	const normalCastActions = ["1", "2", "3", "R", "13", "12", "1M", "10M", "1H"];
	const isOtherCastAction = !normalCastActions.includes(spell.castAction);

	// Merge the submitted data with the default values
	const fields: SpellFormFields = {
		name: submittedFields?.name ?? spell.name,
		level: submittedFields?.level ?? spell.level.toString(),
		traits: submittedFields?.traits ?? spell.traits,
		traditions: submittedFields?.traditions ?? spell.traditions,
		castAction:
			submittedFields?.castAction ??
			(isOtherCastAction ? "other" : spell.castAction),
		castActionOther:
			submittedFields?.castActionOther ??
			(isOtherCastAction ? spell.castAction : ""),
		castTrigger: submittedFields?.castTrigger ?? spell.castTrigger,
		castCost: {
			somatic: submittedFields?.castCost?.somatic ?? spell.castCost.somatic,
			material: submittedFields?.castCost?.material ?? spell.castCost.material,
			verbal: submittedFields?.castCost?.verbal ?? spell.castCost.verbal,
			otherCheckbox:
				submittedFields?.castCost?.otherCheckbox ?? spell.castCost.other !== "",
			other: submittedFields?.castCost?.other ?? spell.castCost.other,
		},
		range: submittedFields?.range ?? spell.range,
		area: submittedFields?.area ?? spell.area,
		targets: submittedFields?.targets ?? spell.targets,
		savingThrow: submittedFields?.savingThrow ?? spell.savingThrow,
		duration: submittedFields?.duration ?? spell.duration,
		description: submittedFields?.description ?? spell.description,
		heightenedEffects:
			submittedFields?.heightenedEffects ?? spell.heightenedEffects,
	};

	const errors = actionData?.errors;

	return (
		<div>
			<h1 className="text-xl">Edit Spell</h1>
			<SpellForm
				fields={fields}
				errors={errors}
				traits={traits}
				mode={"edit"}
				id={spell.id}
			/>
		</div>
	);
}
