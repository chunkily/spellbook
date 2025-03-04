import db from "@/utils/db";
import type Spellbook from "../types/Spellbook";

export default async function spellbookGetAll(): Promise<Spellbook[]> {
	const spellbooks = await db.spellbooks.toArray();

	return spellbooks;
}
