import { json, LoaderFunctionArgs, redirect } from "react-router-dom";
import getFormStringValue from "../../../utils/getFormStringValue";
import spellbookCreate from "../../../domain/actions/spellbookCreate";

export default async function action({ request }: LoaderFunctionArgs) {
	const formData = await request.formData();

	const fields = {
		name: getFormStringValue(formData, "name"),
		clazz: getFormStringValue(formData, "clazz"),
		tradition: getFormStringValue(formData, "tradition"),
		kind: getFormStringValue(formData, "kind"),
	};

	const create = await spellbookCreate(fields);

	if (create.isSuccess) {
		const newId = create.getResult();
		return redirect(`/spellbooks/${newId}`);
	} else {
		return json({
			fields,
			error: create.getErrorDescription(),
			errors: create.getError().errors,
		});
	}
}
