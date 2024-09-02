import db from "@/utils/db";
import Spell from "../types/Spell";

export default async function spellGetById(id: number): Promise<Spell | null> {
	const spell = await db.spells.get(id);

	if (!spell) {
		return null;
	}

	return spell;
}
