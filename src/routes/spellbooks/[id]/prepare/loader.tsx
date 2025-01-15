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

	const spells = await spellsGetByIds(spellbook.learnedSpellIds);

	const options = spells.map((spell) => {
		return {
			label: spell.name,
			text: spell.name,
			value: spell.id.toString(),
		};
	});

	return {
		id: spellbook.id,
		options,
	};
}
