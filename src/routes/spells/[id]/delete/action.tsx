import spellDelete from "@/domain/actions/spellDelete";
import parseId from "@/utils/parseId";
import { triggerSuccessToast } from "@/utils/toasts";
import { ActionFunctionArgs, redirect } from "react-router";

export default async function action({ params }: ActionFunctionArgs) {
	const spellbookId = parseId(params.id);

	const req = await spellDelete(spellbookId);

	if (req.isSuccess) {
		triggerSuccessToast("Spell deleted successfully.");
		return redirect("/spells");
	} else {
		return {
			error: req.getErrorDescription(),
		};
	}
}
