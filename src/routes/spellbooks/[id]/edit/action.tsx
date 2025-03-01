import { LoaderFunctionArgs, redirect } from "react-router";
import getFormStringValue from "@/utils/getFormStringValue";
import spellbookEdit from "@/domain/actions/spellbookEdit";
import { triggerSuccessToast } from "@/utils/toasts";
import parseId from "@/utils/parseId";

export interface FormFields {
	id: string;
	name?: string;
	kind?: string;
	spellslots: {
		[level: number]: string | undefined;
	};
}

export default async function action({ request, params }: LoaderFunctionArgs) {
	const spellbookId = parseId(params.id);

	const formData = await request.formData();

	const fields: FormFields = {
		id: spellbookId,
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

	const update = await spellbookEdit(fields);

	if (update.isSuccess) {
		triggerSuccessToast("Spellbook updated");
		return redirect(`/spellbooks/${spellbookId}`);
	} else {
		return {
			fields,
			error: update.getErrorDescription(),
		};
	}
}
