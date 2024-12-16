import { LoaderFunctionArgs } from "react-router";
import spellbookGetById from "../../../domain/actions/spellbookGetById";
import parseId from "@/utils/parseId";

export default async function loader({ params }: LoaderFunctionArgs) {
	const spellbookId = parseId(params.id);

	const spellbook = await spellbookGetById(spellbookId);

	if (!spellbook) {
		throw new Error("Spellbook not found");
	}

	return {
		spellbook,
	};
}
