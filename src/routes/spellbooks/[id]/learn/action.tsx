import spellbookAddSpell from "@/domain/actions/spellbookAddSpell";
import getFormStringValue from "@/utils/getFormStringValue";
import parseId from "@/utils/parseId";
import { triggerSuccessToast } from "@/utils/toasts";
import { ActionFunctionArgs, redirect } from "react-router";

export default async function action({ request, params }: ActionFunctionArgs) {
	const spellbookId = parseId(params.id);

	const formData = await request.formData();

	const spellId = getFormStringValue(formData, "spell");

	const result = await spellbookAddSpell(spellbookId, spellId);

	if (result.isSuccess) {
		triggerSuccessToast("Spell added to spellbook");
		return redirect(`/spellbooks/${spellbookId}`);
	}

	return {
		error: result.getErrorDescription(),
	};
}
