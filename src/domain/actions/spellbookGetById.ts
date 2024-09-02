import db from "@/utils/db";
import Spellbook from "../types/Spellbook";

export default async function spellbookGetById(
	id: number,
): Promise<Spellbook | null> {
	const spellbook = await db.spellbooks.get(id);

	if (!spellbook) {
		return null;
	}

	return spellbook;
}
