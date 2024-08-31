import spellEdit from "@/domain/actions/spellEdit";
import getFormStringValue from "@/utils/getFormStringValue";
import { triggerSuccessToast } from "@/utils/toasts";
import { ActionFunctionArgs, json, redirect } from "react-router-dom";

export default async function action({ request, params }: ActionFunctionArgs) {
	const id = params.id;

	if (!id) {
		throw new Error("Missing id param");
	}

	const formData = await request.formData();

	const traditionsValue = getFormStringValue(formData, "traditions");
	const traitsValue = getFormStringValue(formData, "traits");
	const heightenedEffectsValue = getFormStringValue(
		formData,
		"heightenedEffects",
	);

	const fields = {
		name: getFormStringValue(formData, "name"),
		description: getFormStringValue(formData, "description") ?? "",
		level: getFormStringValue(formData, "level") ?? "0",
		traditions: JSON.parse(traditionsValue ?? "[]"),
		traits: JSON.parse(traitsValue ?? "[]"),
		isCantrip: getFormStringValue(formData, "isCantrip") === "true",
		source: getFormStringValue(formData, "source") ?? "",
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
