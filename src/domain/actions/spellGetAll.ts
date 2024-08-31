import { openDb, readAllFromStore } from "@/utils/indexedDb";
import { Spell } from "../types/Spell";

export default async function spellGetAll(): Promise<Spell[]> {
	const db = await openDb();

	const spells = await readAllFromStore<Spell>(db, "spells");

	return spells;
}
