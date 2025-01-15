import db from "@/utils/db";
import MaybeError, { ErrorResult, SuccessResult } from "../MaybeError";

export default async function spellbookUpdateLearnedSpells(
	spellbookId: string,
	spellIds: string[],
): Promise<MaybeError<string>> {
	const spellbook = await db.spellbooks.get(spellbookId);

	if (!spellbook) {
		return ErrorResult("Spellbook not found");
	}

	const spells = await db.spells.where("id").anyOf(spellIds).toArray();

	if (spells.length !== spellIds.length) {
		return ErrorResult("Spell not found");
	}

	await db.spellbooks.update(spellbookId, {
		learnedSpellIds: spellIds,
	});

	return SuccessResult();
}

