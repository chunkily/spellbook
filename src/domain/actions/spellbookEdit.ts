import db from "@/utils/db";
import MaybeError, { SuccessResult } from "../MaybeError";
import { SpellSlot, SpellSlots } from "../types/Spellbook";

interface SpellbookEditParams {
	id: string;
	spellslots: {
		[level: number]: string | undefined;
	};
}

export default async function spellbookEdit(
	fields: SpellbookEditParams,
): Promise<MaybeError<string>> {
	const errors: Record<string, string[]> = {};
	const spellSlots: SpellSlots = [
		buildSpellSlots(fields.spellslots[0], 0, errors) ?? [],
		buildSpellSlots(fields.spellslots[1], 1, errors) ?? [],
		buildSpellSlots(fields.spellslots[2], 2, errors) ?? [],
		buildSpellSlots(fields.spellslots[3], 3, errors) ?? [],
		buildSpellSlots(fields.spellslots[4], 4, errors) ?? [],
		buildSpellSlots(fields.spellslots[5], 5, errors) ?? [],
		buildSpellSlots(fields.spellslots[6], 6, errors) ?? [],
		buildSpellSlots(fields.spellslots[7], 7, errors) ?? [],
		buildSpellSlots(fields.spellslots[8], 8, errors) ?? [],
		buildSpellSlots(fields.spellslots[9], 9, errors) ?? [],
		buildSpellSlots(fields.spellslots[10], 10, errors) ?? [],
	];

	await db.spellbooks.update(fields.id, {
		spellSlots,
	});

	return SuccessResult();
}

function buildSpellSlots(
	value: string | undefined,
	level: number,
	errors: Record<string, string[]>,
): SpellSlot[] | null {
	const count = parseInt(value ?? "0", 10);

	if (isNaN(count)) {
		errors[`spellslots${level}`] = ["Invalid number"];
		return null;
	}

	if (count < 0) {
		errors[`spellslots${level}`] = ["Must be 0 or greater"];
		return null;
	}

	const slots: SpellSlot[] = [];
	for (let i = 0; i < count; i++) {
		slots.push({
			id: `${level}-${i + 1}`,
			level,
		});
	}
	return slots;
}
