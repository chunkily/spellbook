import SpellForm, { type SpellFormFields } from "@/components/SpellForm";
import spellGetById from "@/domain/actions/spellGetById";
import traitGetAll from "@/domain/actions/traitGetAll";
import getFormStringValue from "@/utils/getFormStringValue";
import { isHeightenedEffectArray } from "@/domain/types/HeightenedEffect";
import { data, redirect } from "react-router";
import getFormStringArray from "@/utils/getFormStringArray";
import spellEdit from "@/domain/actions/spellEdit";
import { triggerSuccessToast } from "@/utils/toasts";

import type { Route } from "./+types/spells.$spellId.edit";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
	const spellId = params.spellId;

	const spell = await spellGetById(spellId);

	if (!spell) {
		throw new Error("Spell not found");
	}

	const traits = await traitGetAll();

	return {
		spell,
		traits,
	};
}

export async function clientAction({
	request,
	params,
}: Route.ClientActionArgs) {
	const spellId = params.spellId;
	const formData = await request.formData();

	const heightenedEffectsValue = getFormStringValue(
		formData,
		"heightenedEffects",
	);

	const heightenedEffects = JSON.parse(heightenedEffectsValue ?? "[]");
	if (!isHeightenedEffectArray(heightenedEffects)) {
		throw new Error("Invalid heightened effects.");
	}

	const fields: SpellFormFields = {
		name: getFormStringValue(formData, "name"),
		level: getFormStringValue(formData, "level"),
		traditions: getFormStringArray(formData, "traditions"),
		traits: getFormStringArray(formData, "traits"),
		castAction: getFormStringValue(formData, "castAction"),
		castActionOther: getFormStringValue(formData, "castActionOther"),
		castTrigger: getFormStringValue(formData, "castTrigger"),
		castCost: {
			somatic: formData.get("castCost.somatic") === "true",
			material: formData.get("castCost.material") === "true",
			verbal: formData.get("castCost.verbal") === "true",
			otherCheckbox: formData.get("castCost.otherCheckbox") === "true",
			other: getFormStringValue(formData, "castCost.other"),
		},
		range: getFormStringValue(formData, "range"),
		area: getFormStringValue(formData, "area"),
		targets: getFormStringValue(formData, "targets"),
		savingThrow: getFormStringValue(formData, "savingThrow"),
		duration: getFormStringValue(formData, "duration"),
		description: getFormStringValue(formData, "description"),
		heightenedEffects: heightenedEffects,
	};

	const cmd = await spellEdit(spellId, fields);

	if (cmd.isSuccess) {
		triggerSuccessToast("Spell edited successfully.");
		const newId = cmd.getResult();
		return redirect(`/spells/${newId}`);
	}

	return data(
		{
			error: cmd.getErrorDescription(),
			errors: cmd.getError().errors,
			fields,
		},
		{
			status: 400,
		},
	);
}

export default function SpellEditPage({
	loaderData,
	actionData,
}: Route.ComponentProps) {
	const { spell, traits } = loaderData;

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

