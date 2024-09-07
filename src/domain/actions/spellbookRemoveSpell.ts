import db from "@/utils/db";
import MaybeError, { ErrorResult, SuccessResult } from "../MaybeError";

export default async function spellbookRemoveSpell(
	spellbookId: number,
	spellId: string | undefined,
): Promise<MaybeError<string>> {
	const spellbook = await db.spellbooks.get(spellbookId);

	if (!spellbook) {
		return ErrorResult("Spellbook not found");
	}

	if (!spellId) {
		return ErrorResult("Spell is required");
	}

	const spellIdNumber = parseInt(spellId, 10);

	if (isNaN(spellIdNumber)) {
		return ErrorResult("Invalid spell id");
	}

	if (!spellbook.learnedSpells.some((s) => s.id === spellIdNumber)) {
		// Is this an error?
		return SuccessResult();
	}

	await db.spellbooks.update(spellbookId, {
		learnedSpells: spellbook.learnedSpells.filter(
			(s) => s.id !== spellIdNumber,
		),
	});

	return SuccessResult();
}
