import db from "@/utils/db";
import ResultOrError, { ErrorResult, SuccessResult } from "../ResultOrError";
import Spellbook, { SpellSlot, SpellSlots } from "../types/Spellbook";

interface SpellbookCreate {
	name?: string;
	kind?: string;
	tradition?: string;
	spellslots: {
		[level: number]: string | undefined;
	};
}

interface SpellbookCreateErrors {
	errors?: Record<string, string[]>;
	errorDescription: string;
}

export default async function spellbookCreate(
	fields: SpellbookCreate,
): Promise<ResultOrError<number, SpellbookCreateErrors>> {
	const errors: Record<string, string[]> = {};

	if (!fields.name) {
		errors.name = ["Name is required"];
	}

	let kind: "prepared" | "spontaneous" = "prepared";
	if (!fields.kind) {
		errors.kind = ["Kind is required"];
	} else if (fields.kind !== "prepared" && fields.kind !== "spontaneous") {
		errors.kind = ["Kind must be 'prepared' or 'spontaneous'"];
	} else {
		kind = fields.kind;
	}

	if (!fields.tradition) {
		errors.tradition = ["Tradition is required"];
	}

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

	if (Object.keys(errors).length > 0) {
		return ErrorResult({
			errors,
			errorDescription: "There were validation errors",
		});
	}

	const spellbook: Omit<Spellbook, "id"> = {
		name: fields.name?.trim() ?? "",
		kind,
		tradition: fields.tradition ?? "",
		learnedSpells: [],
		spellSlots,
	};

	let newId: number;
	try {
		newId = await db.spellbooks.add(spellbook);
	} catch (error) {
		console.error(error);
		return ErrorResult({
			errorDescription: "There was an error saving the data",
		});
	}

	return SuccessResult(newId);
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
