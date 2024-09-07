import { json, LoaderFunctionArgs } from "react-router-dom";
import spellbookGetById from "@/domain/actions/spellbookGetById";
import parseId from "@/utils/parseId";
import spellGetAll from "@/domain/actions/spellGetAll";

export default async function loader({ params }: LoaderFunctionArgs) {
	const spellbookId = parseId(params.id);

	const spellbook = await spellbookGetById(spellbookId);

	if (!spellbook) {
		throw new Error("Spellbook not found");
	}

	const alreadyLearnedSpellIds = spellbook.learnedSpells.map(
		(spell) => spell.id,
	);
	const allSpells = await spellGetAll();

	const options = allSpells
		.filter((spell) => {
			return !alreadyLearnedSpellIds.includes(spell.id);
		})
		.map((spell) => {
			return {
				label: spell.name,
				text: spell.name,
				value: spell.id.toString(),
			};
		});

	return json({
		id: spellbook.id,
		options,
	});
}
