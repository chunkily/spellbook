import db from "@/utils/db";
import type Spellbook from "../types/Spellbook";

export default async function spellbookGetById(
	id: string,
): Promise<Spellbook | null> {
	const spellbook = await db.spellbooks.get(id);

	if (!spellbook) {
		return null;
	}

	return spellbook;
}
