import { SpellFormFields } from "@/components/SpellForm";
import spellCreate from "@/domain/actions/spellCreate";
import { isHeightenedEffectArray } from "@/domain/types/HeightenedEffect";
import getFormStringArray from "@/utils/getFormStringArray";
import getFormStringValue from "@/utils/getFormStringValue";
import { triggerSuccessToast } from "@/utils/toasts";
import { ActionFunctionArgs, redirect } from "react-router";

export default async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();

	const heightenedEffectsValue = getFormStringValue(
		formData,
		"heightenedEffects",
	);

	const heightenedEffects = JSON.parse(heightenedEffectsValue ?? "[]");
	if (!isHeightenedEffectArray(heightenedEffects)) {
		return Response.json(
			{
				error: "Invalid heightened effects.",
				errors: {
					heightenedEffects: ["Invalid heightened effects."],
				},
			},
			{
				status: 400,
			},
		);
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

	return Response.json(
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
