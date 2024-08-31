import spellCreate from "@/domain/actions/spellCreate";
import getFormStringValue from "@/utils/getFormStringValue";
import { triggerSuccessToast } from "@/utils/toasts";
import { ActionFunctionArgs, json, redirect } from "react-router-dom";

export default async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();

	const traditionsValue = getFormStringValue(formData, "traditions");
	const traitsValue = getFormStringValue(formData, "traits");
	const heightenedEffectsValue = getFormStringValue(
		formData,
		"heightenedEffects",
	);

	const newSpell = {
		name: getFormStringValue(formData, "name") ?? "",
		description: getFormStringValue(formData, "description") ?? "",
		level: parseInt(getFormStringValue(formData, "level") ?? "0", 10),
		traditions: JSON.parse(traditionsValue ?? "[]"),
		traits: JSON.parse(traitsValue ?? "[]"),
		isCantrip: getFormStringValue(formData, "isCantrip") === "true",
		source: getFormStringValue(formData, "source") ?? "",
		heightenedEffects: JSON.parse(heightenedEffectsValue ?? "[]"),
	};

	const cmd = await spellCreate(newSpell);

	if (cmd.isSuccess) {
		const newId = cmd.getResult();
		triggerSuccessToast("Spell created successfully.");
		return redirect(`/spells/${newId}`);
	}

	return json({ errors: cmd.getErrorDescription() }, 400);
}
