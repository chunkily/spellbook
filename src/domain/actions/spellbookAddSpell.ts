import db from "@/utils/db";
import MaybeError, { ErrorResult, SuccessResult } from "../MaybeError";

export default async function spellbookAddSpell(
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

	const spell = await db.spells.get(spellId);

	if (!spell) {
		return ErrorResult("Spell not found");
	}

	if (spellbook.learnedSpells.some((s) => s.id === spellId)) {
		return ErrorResult("Spell already learned");
	}

	const sortedLearnedSpells = [...spellbook.learnedSpells, spell].sort((a, b) =>
		a.name.localeCompare(b.name),
	);

	await db.spellbooks.update(spellbookId, {
		learnedSpells: sortedLearnedSpells,
	});

	return SuccessResult();
}
