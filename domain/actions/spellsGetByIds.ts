import db from "@/utils/db";
import type Spell from "../types/Spell";

export default async function spellsGetByIds(ids: string[]): Promise<Spell[]> {
	return await db.spells.where("id").anyOf(ids).toArray();
}
