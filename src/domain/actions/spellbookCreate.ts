import db from "@/utils/db";
import ResultOrError, { ErrorResult, SuccessResult } from "../ResultOrError";
import Spellbook from "../types/Spellbook";

interface SpellbookCreate {
	name?: string;
	kind?: string;
	tradition?: string;
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
		spellSlots: [],
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
