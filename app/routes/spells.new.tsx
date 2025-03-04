import SpellForm, { type SpellFormFields } from "@/components/SpellForm";
import traitGetAll from "@/domain/actions/traitGetAll";
import { isHeightenedEffectArray } from "@/domain/types/HeightenedEffect";
import getFormStringArray from "@/utils/getFormStringArray";
import getFormStringValue from "@/utils/getFormStringValue";
import spellCreate from "@/domain/actions/spellCreate";
import { triggerSuccessToast } from "@/utils/toasts";
import { redirect, data } from "react-router";

import type { Route } from "./+types/spells.new";

export async function clientLoader(_: Route.ClientLoaderArgs) {
	const traits = await traitGetAll();

	return {
		traits,
	};
}

export async function clientAction({ request }: Route.ClientActionArgs) {
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

	const cmd = await spellCreate(fields);

	if (cmd.isSuccess) {
		const newId = cmd.getResult();
		triggerSuccessToast("Spell created successfully.");
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

export default function SpellsNewPage({
	loaderData,
	actionData,
}: Route.ComponentProps) {
	const { traits } = loaderData;

	return (
		<div>
			<h1 className="text-xl">Add New Spell</h1>
			<SpellForm
				fields={actionData?.fields}
				errors={actionData?.errors}
				traits={traits}
				mode={"create"}
			/>
		</div>
	);
}

