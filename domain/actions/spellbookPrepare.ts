import db from "@/utils/db";
import type MaybeError from "../MaybeError";
import { ErrorResult, SuccessResult } from "../MaybeError";

export default async function spellbookPrepare(
	spellbookId: string,
	spellIdsBySlotId: Record<string, string>,
): Promise<MaybeError<string>> {
	const spellbook = await db.spellbooks.get(spellbookId);

	if (!spellbook) {
		return ErrorResult("Spellbook not found");
	}

	spellbook.spellSlots.forEach((slots) => {
		slots.forEach((slot) => {
			slot.preparedSpellId = spellIdsBySlotId[slot.id];
		});
	});

	await db.spellbooks.put(spellbook);

	return SuccessResult();
}
