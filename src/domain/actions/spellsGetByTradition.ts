import db from "@/utils/db";
import Spell from "../types/Spell";

export default async function spellsGetByTradition(
	tradition: string,
): Promise<Spell[]> {
	const spells = await db.spells
		.filter((s) => s.traditions.some((t) => t == tradition))
		.toArray();

	return spells;
}
