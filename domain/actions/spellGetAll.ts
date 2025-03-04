import db from "@/utils/db";
import type Spell from "../types/Spell";

export default async function spellGetAll(): Promise<Spell[]> {
	const spells = await db.spells.toArray();

	return spells;
}
