import { json, LoaderFunctionArgs, redirect } from "react-router-dom";
import getFormStringValue from "../../../utils/getFormStringValue";
import spellbookCreate from "../../../domain/actions/spellbookCreate";

export default async function action({ request }: LoaderFunctionArgs) {
	const formData = await request.formData();

	const fields = {
		name: getFormStringValue(formData, "name"),
	};

	const create = await spellbookCreate(fields);

	if (create.isSuccess) {
		return redirect("/spellbooks");
	} else {
		return json({
			fields,
			error: create.getErrorDescription(),
			errors: create.getError().errors,
		});
	}
}
