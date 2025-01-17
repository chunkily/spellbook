import spellbookUpdateLearnedSpells from "@/domain/actions/spellbookUpdateLearnedSpells";
import getFormStringValue from "@/utils/getFormStringValue";
import parseId from "@/utils/parseId";
import { triggerSuccessToast } from "@/utils/toasts";
import { ActionFunctionArgs, redirect } from "react-router";

export default async function action({ request, params }: ActionFunctionArgs) {
	const spellbookId = parseId(params.id);

	const formData = await request.formData();

	const spellIds = getFormStringValue(formData, "spells") ?? "";

	const spellList = spellIds.split(",");

	const result = await spellbookUpdateLearnedSpells(spellbookId, spellList);

	if (result.isSuccess) {
		triggerSuccessToast("Spell added to spellbook");
		return redirect(`/spellbooks/${spellbookId}`);
	}

	return {
		error: result.getErrorDescription(),
	};
}
