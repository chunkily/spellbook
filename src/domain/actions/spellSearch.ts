import db from "@/utils/db";
import Spell from "../types/Spell";

interface SearchParams {
	search?: string;
	sort?: string;
}

export default async function spellSearch({
	search,
	sort,
}: SearchParams): Promise<Spell[]> {
	let spells: Spell[];
	if (!search) {
		spells = await db.spells.toArray();
	} else {
		const pattern = new RegExp(safeRegex(search), "i");
		spells = await db.spells
			.filter((spell) => pattern.test(spell.name))
			.toArray();
	}

	spells = spells.sort((a, b) => a.name.localeCompare(b.name));

	if (sort === "-name") {
		spells = spells.reverse();
	} else if (sort === "level") {
		spells = spells.sort((a, b) => a.level - b.level);
	} else if (sort === "-level") {
		spells = spells.sort((a, b) => b.level - a.level);
	}

	return spells;
}

function safeRegex(value: string): string {
	// Remove all non-alphanumeric and whitespace characters
	return value.replace(/[^\w\s]+/g, "");
}
