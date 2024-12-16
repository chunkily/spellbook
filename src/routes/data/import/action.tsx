import importData from "@/domain/actions/importData";
import Spell from "@/domain/types/Spell";
import Spellbook from "@/domain/types/Spellbook";
import getFormStringValue from "@/utils/getFormStringValue";
import { triggerSuccessToast } from "@/utils/toasts";
import { ActionFunctionArgs, redirect } from "react-router";

interface Data {
	spells?: Spell[];
	spellbooks?: Spellbook[];
	traits?: string[];
}

export default async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();

	let data: Data;

	try {
		const dataJson = getFormStringValue(formData, "data");
		data = parseData(dataJson);
	} catch (err) {
		console.error(err);
		return {
			errors: {
				data: ["Invalid data provided."],
			},
		};
	}

	const deleteExisting =
		getFormStringValue(formData, "deleteExisting") === "true";

	const op = await importData({
		...data,
		deleteExisting,
	});

	if (op.isSuccess) {
		triggerSuccessToast("Data imported successfully.");
		return redirect("/data");
	}

	return {
		errors: {
			data: [op.getErrorDescription()],
		},
	};
}

function parseData(dataJson: string | undefined): Data {
	const data = JSON.parse(dataJson || "{}") as unknown;

	// Check that the data conforms to the expected format
	if (typeof data !== "object" || data === null) {
		throw new Error("Data must be an object.");
	}

	return data;
}
