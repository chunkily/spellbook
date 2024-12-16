import { SpellFormFields } from "@/components/SpellForm";
import spellEdit from "@/domain/actions/spellEdit";
import { isHeightenedEffectArray } from "@/domain/types/HeightenedEffect";
import getFormStringArray from "@/utils/getFormStringArray";
import getFormStringValue from "@/utils/getFormStringValue";
import parseId from "@/utils/parseId";
import { triggerSuccessToast } from "@/utils/toasts";
import { ActionFunctionArgs, data, redirect } from "react-router";

export default async function action({ request, params }: ActionFunctionArgs) {
	const id = parseId(params.id);

	const formData = await request.formData();

	const heightenedEffectsValue = getFormStringValue(
		formData,
		"heightenedEffects",
	);

	const heightenedEffects = JSON.parse(heightenedEffectsValue ?? "[]");
	if (!isHeightenedEffectArray(heightenedEffects)) {
		return data(
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

	const cmd = await spellEdit(id, fields);

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
