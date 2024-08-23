import { json, LoaderFunctionArgs } from "react-router-dom";
import spellbookGetById from "@/domain/actions/spellbookGetById";

export default async function loader({ params }: LoaderFunctionArgs) {
	const spellbookId = params.id;

	if (!spellbookId) {
		throw new Error("Missing id param");
	}

	const spellbook = await spellbookGetById(spellbookId);

	if (!spellbook) {
		throw new Error("Spellbook not found");
	}

	return json({
		spellbook,
	});
}
