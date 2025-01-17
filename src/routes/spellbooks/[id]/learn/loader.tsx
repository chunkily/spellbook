import { LoaderFunctionArgs } from "react-router";
import spellbookGetById from "@/domain/actions/spellbookGetById";
import parseId from "@/utils/parseId";
import spellsGetByTradition from "@/domain/actions/spellsGetByTradition";

export default async function loader({ params }: LoaderFunctionArgs) {
	const spellbookId = parseId(params.id);

	const spellbook = await spellbookGetById(spellbookId);

	if (!spellbook) {
		throw new Error("Spellbook not found");
	}

	const allSpells = await spellsGetByTradition(spellbook.tradition);

	const options = allSpells.map((spell) => {
		return {
			label: spell.name,
			text: spell.name,
			value: spell.id.toString(),
		};
	});

	options.unshift({
		label: "Select a spell",
		text: "",
		value: "",
	});

	return {
		id: spellbook.id,
		allSpells,
		learnedSpellIds: spellbook.learnedSpellIds,
		options,
	};
}
