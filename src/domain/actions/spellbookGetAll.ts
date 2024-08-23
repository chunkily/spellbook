import { openDb, readAllFromStore } from "@/utils/indexedDb";
import Spellbook from "../types/Spellbook";

export default async function spellbookGetAll() {
	const db = await openDb();

	const spellbooks = await readAllFromStore<Spellbook>(db, "spellbooks");

	return spellbooks;
}
