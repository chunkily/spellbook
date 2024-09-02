import db from "@/utils/db";
import Spell from "../types/Spell";

export default async function spellGetByName(
	name: string | undefined,
): Promise<Spell | undefined> {
	if (!name) {
		return undefined;
	}

	const spell = await db.spells.where("name").equalsIgnoreCase(name).first();

	return spell;
}
