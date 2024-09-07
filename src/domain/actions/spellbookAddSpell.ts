import db from "@/utils/db";
import MaybeError, { ErrorResult, SuccessResult } from "../MaybeError";

export default async function spellbookAddSpell(
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

	const spell = await db.spells.get(spellIdNumber);

	if (!spell) {
		return ErrorResult("Spell not found");
	}

	if (spellbook.learnedSpells.some((s) => s.id === spellIdNumber)) {
		return ErrorResult("Spell already learned");
	}

	await db.spellbooks.update(spellbookId, {
		learnedSpells: [...spellbook.learnedSpells, spell],
	});

	return SuccessResult();
}
