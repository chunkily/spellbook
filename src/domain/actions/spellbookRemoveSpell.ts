import db from "@/utils/db";
import MaybeError, { ErrorResult, SuccessResult } from "../MaybeError";

export default async function spellbookRemoveSpell(
	spellbookId: string,
	spellId: string | undefined,
): Promise<MaybeError<string>> {
	const spellbook = await db.spellbooks.get(spellbookId);

	if (!spellbook) {
		return ErrorResult("Spellbook not found");
	}

	if (!spellId) {
		return ErrorResult("Spell is required");
	}

	if (!spellbook.learnedSpellIds.some((id) => id === spellId)) {
		// Is this an error?
		return SuccessResult();
	}

	await db.spellbooks.update(spellbookId, {
		learnedSpellIds: spellbook.learnedSpellIds.filter((id) => id !== spellId),
	});

	return SuccessResult();
}
