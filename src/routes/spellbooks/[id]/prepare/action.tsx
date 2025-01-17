import spellbookPrepare from "@/domain/actions/spellbookPrepare";
import getFormStringValue from "@/utils/getFormStringValue";
import parseId from "@/utils/parseId";
import { triggerErrorToast, triggerSuccessToast } from "@/utils/toasts";
import { ActionFunctionArgs, redirect } from "react-router";

export default async function action({ request, params }: ActionFunctionArgs) {
	const spellbookId = parseId(params.id);

	const formData = await request.formData();

	const spellIdsBySlotId: Record<string, string> = {};
	Array.from(formData.keys()).forEach((key) => {
		const value = getFormStringValue(formData, key);
		if (value) {
			spellIdsBySlotId[key] = value;
		}
	});

	console.log(spellIdsBySlotId);

	const result = await spellbookPrepare(spellbookId, spellIdsBySlotId);

	if (result.isSuccess) {
		triggerSuccessToast("Spell slots saved");
		return redirect(`/spellbooks/${spellbookId}`);
	} else {
		triggerErrorToast(result.getErrorDescription());
	}

	return {};
}
