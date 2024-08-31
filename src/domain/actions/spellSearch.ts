import { openDb, readAllFromStore } from "@/utils/indexedDb";
import { Spell } from "../types/Spell";

interface SearchParams {
	search?: string;
}

export default async function spellSearch({
	search,
}: SearchParams): Promise<Spell[]> {
	const db = await openDb();

	let spells = await readAllFromStore<Spell>(db, "spells");

	if (search) {
		spells = spells.filter((spell) =>
			spell.name.toLowerCase().includes(search.toLowerCase()),
		);
	}

	return spells;
}
