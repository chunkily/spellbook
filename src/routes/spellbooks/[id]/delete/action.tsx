import spellbookDelete from "@/domain/actions/spellbookDelete";
import parseId from "@/utils/parseId";
import { triggerSuccessToast } from "@/utils/toasts";
import { ActionFunctionArgs, data, redirect } from "react-router";

export default async function action({ params }: ActionFunctionArgs) {
	const spellbookId = parseId(params.id);

	const req = await spellbookDelete(spellbookId);

	if (req.isSuccess) {
		triggerSuccessToast("Spellbook deleted successfully.");
		return redirect("/spellbooks");
	} else {
		return data(
			{
				error: req.getErrorDescription(),
			},
			{
				status: 500,
			},
		);
	}
}
