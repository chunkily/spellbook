import spellCreate from "@/domain/actions/spellCreate";
import getFormStringArray from "@/utils/getFormStringArray";
import getFormStringValue from "@/utils/getFormStringValue";
import { triggerSuccessToast } from "@/utils/toasts";
import { ActionFunctionArgs, json, redirect } from "react-router-dom";

export default async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();

	const heightenedEffectsValue = getFormStringValue(
		formData,
		"heightenedEffects",
	);

	const fields = {
		name: getFormStringValue(formData, "name"),
		level: getFormStringValue(formData, "level"),
		traditions: getFormStringArray(formData, "traditions"),
		traits: getFormStringArray(formData, "traits"),
		source: getFormStringValue(formData, "source"),
		castAction: getFormStringValue(formData, "castAction"),
		castActionOther: getFormStringValue(formData, "castActionOther"),
		castCost: {
			somatic: formData.get("castCost.somatic") === "true",
			material: formData.get("castCost.material") === "true",
			verbal: formData.get("castCost.verbal") === "true",
			other: getFormStringValue(formData, "castCost.other"),
		},
		range: getFormStringValue(formData, "range"),
		area: getFormStringValue(formData, "area"),
		targets: getFormStringValue(formData, "targets"),
		savingThrow: getFormStringValue(formData, "savingThrow"),
		duration: getFormStringValue(formData, "duration"),
		description: getFormStringValue(formData, "description"),
		heightenedEffects: JSON.parse(heightenedEffectsValue ?? "[]"),
	};

	const cmd = await spellCreate(fields);

	if (cmd.isSuccess) {
		const newId = cmd.getResult();
		triggerSuccessToast("Spell created successfully.");
		return redirect(`/spells/${newId}`);
	}

	return json(
		{
			error: cmd.getErrorDescription(),
			errors: cmd.getError().errors,
			fields,
		},
		400,
	);
}
