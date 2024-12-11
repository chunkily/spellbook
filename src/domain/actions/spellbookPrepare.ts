import db from "@/utils/db";
import MaybeError, { ErrorResult, SuccessResult } from "../MaybeError";

export default async function spellbookPrepare(
	spellbookId: number,
	spellId: number,
	spellslotId: string | undefined,
): Promise<MaybeError<string>> {
	if (!spellslotId) {
		return ErrorResult("Spell slot not provided");
	}

	const spellbook = await db.spellbooks.get(spellbookId);

	if (!spellbook) {
		return ErrorResult("Spellbook not found");
	}

	const spell = await db.spells.get(spellId);

	if (!spell) {
		return ErrorResult("Spell not found");
	}

	// Abuse parseInt logic to grab the spell slot level from the id
	// "1-2" -> 1, "10-1" -> 10
	const spellslotLevel = parseInt(spellslotId, 10);

	const spellslot = spellbook.spellSlots[spellslotLevel].find(
		(slot) => slot.id === spellslotId,
	);

	if (!spellslot) {
		return ErrorResult("Spell slot not found");
	}

	// Check for duplicate prepared spells
	spellbook.spellSlots.forEach((level) => {
		level.forEach((slot) => {
			if (slot.preparedSpellId === spellId) {
				// Remove from slot
				slot.preparedSpellId = undefined;
			}
		});
	});

	spellslot.preparedSpellId = spellId;

	return SuccessResult();
}
