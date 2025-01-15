import { LoaderFunctionArgs } from "react-router";
import spellbookGetById from "@/domain/actions/spellbookGetById";
import parseId from "@/utils/parseId";
import spellsGetByIds from "@/domain/actions/spellsGetByIds";

export default async function loader({ params }: LoaderFunctionArgs) {
	const spellbookId = parseId(params.id);

	const spellbook = await spellbookGetById(spellbookId);

	if (!spellbook) {
		throw new Error("Spellbook not found");
	}

	const learnedSpells = await spellsGetByIds(spellbook.learnedSpellIds);

	return {
		id: spellbook.id,
		learnedSpells: learnedSpells,
	};
}
