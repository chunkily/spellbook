import spellbookDelete from "@/domain/actions/spellbookDelete";
import { ActionFunctionArgs, json, redirect } from "react-router-dom";

export default async function action({ params }: ActionFunctionArgs) {
	const spellbookId = params.id;

	if (!spellbookId) {
		throw new Error("Missing id param");
	}

	const req = await spellbookDelete(spellbookId);

	if (req.isSuccess) {
		return redirect("/spellbooks");
	} else {
		return json({
			error: req.getErrorDescription(),
		});
	}
}
