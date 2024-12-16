import spellbookPrepare from "@/domain/actions/spellbookPrepare";
import getFormStringValue from "@/utils/getFormStringValue";
import parseId from "@/utils/parseId";
import { triggerErrorToast, triggerSuccessToast } from "@/utils/toasts";
import { ActionFunctionArgs } from "react-router";

export default async function action({ request, params }: ActionFunctionArgs) {
	const spellbookId = parseId(params.id);

	const formData = await request.formData();

	const spellId = parseId(getFormStringValue(formData, "spell"));
	const spellslot = getFormStringValue(formData, "spellslot");

	const result = await spellbookPrepare(spellbookId, spellId, spellslot);

	if (result.isSuccess) {
		triggerSuccessToast("Spell added to spellbook");
	} else {
		triggerErrorToast(result.getErrorDescription());
	}

	return {};
}
