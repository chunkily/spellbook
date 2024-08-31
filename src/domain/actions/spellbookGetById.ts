import { openDb, readFromStore } from "../../utils/indexedDb";
import Spellbook from "../types/Spellbook";

export default async function spellbookGetById(
	id: string,
): Promise<Spellbook | null> {
	const db = await openDb();

	const spellbook = await readFromStore<Spellbook>(db, "spellbooks", id);

	if (!spellbook) {
		return null;
	}

	return spellbook;
}
