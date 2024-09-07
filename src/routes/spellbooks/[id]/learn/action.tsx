import spellbookAddSpell from "@/domain/actions/spellbookAddSpell";
import getFormStringValue from "@/utils/getFormStringValue";
import parseId from "@/utils/parseId";
import { triggerSuccessToast } from "@/utils/toasts";
import { ActionFunctionArgs, json, redirect } from "react-router-dom";

export default async function action({ request, params }: ActionFunctionArgs) {
	const spellbookId = parseId(params.id);

	const formData = await request.formData();

	const spellId = getFormStringValue(formData, "spell");

	const result = await spellbookAddSpell(spellbookId, spellId);

	if (result.isSuccess) {
		triggerSuccessToast("Spell added to spellbook");
		return redirect(`/spellbooks/${spellbookId}`);
	}

	return json({
		error: result.getErrorDescription(),
	});
}
