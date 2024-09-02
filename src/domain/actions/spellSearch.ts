import db from "@/utils/db";
import Spell from "../types/Spell";

interface SearchParams {
	search?: string;
}

export default async function spellSearch({
	search,
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

	return spells.sort((a, b) => a.name.localeCompare(b.name));
}

function safeRegex(value: string): string {
	// Remove all non-alphanumeric and whitespace characters
	return value.replace(/[^\w\s]+/g, "");
}
