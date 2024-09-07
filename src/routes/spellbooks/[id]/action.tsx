import spellbookRemoveSpell from "@/domain/actions/spellbookRemoveSpell";
import getFormStringValue from "@/utils/getFormStringValue";
import parseId from "@/utils/parseId";
import { triggerErrorToast, triggerSuccessToast } from "@/utils/toasts";
import { ActionFunctionArgs, json } from "react-router-dom";

export default async function action({ request, params }: ActionFunctionArgs) {
	const spellbookId = parseId(params.id);

	const formData = await request.formData();

	const action = getFormStringValue(formData, "action");

	let result;

	switch (action) {
		case "remove":
			const spellId = getFormStringValue(formData, "spellId");
			result = await spellbookRemoveSpell(spellbookId, spellId);
			break;
		default:
			return json({
				error: "Invalid action",
			});
	}

	if (result.isSuccess) {
		triggerSuccessToast("Spell removed from spellbook");
	} else {
		triggerErrorToast(result.getErrorDescription());
	}

	return json({});
}
