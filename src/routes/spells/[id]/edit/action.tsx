import spellEdit from "@/domain/actions/spellEdit";
import getFormStringArray from "@/utils/getFormStringArray";
import getFormStringValue from "@/utils/getFormStringValue";
import parseId from "@/utils/parseId";
import { triggerSuccessToast } from "@/utils/toasts";
import { ActionFunctionArgs, json, redirect } from "react-router-dom";

export default async function action({ request, params }: ActionFunctionArgs) {
	const id = parseId(params.id);

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
		heightenedEffects: JSON.parse(heightenedEffectsValue ?? "[]"),
	};

	const cmd = await spellEdit(id, fields);

	if (cmd.isSuccess) {
		triggerSuccessToast("Spell edited successfully.");
		return redirect(`/spells/${id}`);
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
