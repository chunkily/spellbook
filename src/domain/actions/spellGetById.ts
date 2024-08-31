import { openDb, readFromStore } from "@/utils/indexedDb";
import { Spell } from "../types/Spell";

export default async function spellGetById(id: string): Promise<Spell | null> {
	const db = await openDb();

	const spell = await readFromStore<Spell>(db, "spells", id);

	if (!spell) {
		return null;
	}

	return spell;
}
