import db from "@/utils/db";
import type MaybeError from "../MaybeError";
import { SuccessResult } from "../MaybeError";
import type Spell from "../types/Spell";
import type Spellbook from "../types/Spellbook";

interface Data {
	spells?: Spell[];
	spellbooks?: Spellbook[];
	traits?: string[];
	deleteExisting: boolean;
}

export default async function importData(
	data: Data,
): Promise<MaybeError<string>> {
	if (data.spells) {
		if (data.deleteExisting) {
			await db.spells.clear();
		}
		await db.spells.bulkPut(data.spells);
	}

	if (data.spellbooks) {
		if (data.deleteExisting) {
			await db.spellbooks.clear();
		}
		await db.spellbooks.bulkPut(data.spellbooks);
	}

	if (data.traits) {
		if (data.deleteExisting) {
			await db.traits.clear();
		}
		await db.traits.bulkPut(data.traits.map((name) => ({ name })));
	}

	return SuccessResult();
}
