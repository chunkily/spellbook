import { openDb, readFromStore } from "../../utils/indexedDb";
import Spellbook from "../types/Spellbook";

export default async function spellbookGetById(id: string) {
	const db = await openDb();

	const spellbook = await readFromStore<Spellbook>(db, "spellbooks", id);

	return spellbook;
}
