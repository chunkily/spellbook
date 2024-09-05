import { json, LoaderFunctionArgs, redirect } from "react-router-dom";
import getFormStringValue from "../../../utils/getFormStringValue";
import spellbookCreate from "../../../domain/actions/spellbookCreate";

export interface FormFields {
	name?: string;
	clazz?: string;
	tradition?: string;
	kind?: string;
	spellslots: {
		[level: number]: string | undefined;
	};
}

export default async function action({ request }: LoaderFunctionArgs) {
	const formData = await request.formData();

	const fields: FormFields = {
		name: getFormStringValue(formData, "name"),
		clazz: getFormStringValue(formData, "clazz"),
		tradition: getFormStringValue(formData, "tradition"),
		kind: getFormStringValue(formData, "kind"),
		spellslots: {
			0: getFormStringValue(formData, "spellslots0"),
			1: getFormStringValue(formData, "spellslots1"),
			2: getFormStringValue(formData, "spellslots2"),
			3: getFormStringValue(formData, "spellslots3"),
			4: getFormStringValue(formData, "spellslots4"),
			5: getFormStringValue(formData, "spellslots5"),
			6: getFormStringValue(formData, "spellslots6"),
			7: getFormStringValue(formData, "spellslots7"),
			8: getFormStringValue(formData, "spellslots8"),
			9: getFormStringValue(formData, "spellslots9"),
			10: getFormStringValue(formData, "spellslots10"),
		},
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
