import { openDb, writeToStore } from "@/utils/indexedDb";
import ResultOrError, { ErrorResult, SuccessResult } from "../ResultOrError";
import { Spell } from "../types/Spell";
import spellGetByName from "./spellGetByName";

interface SpellCreateError {
	errors?: Record<string, string[]>;
	errorDescription: string;
}

export default async function spellCreate(
	newSpell: Omit<Spell, "id">,
): Promise<ResultOrError<number, SpellCreateError>> {
	const errors: Record<string, string[]> = {};
	if (!newSpell.name) {
		errors.name = ["Name is required"];
	}
	if (!newSpell.description) {
		errors.description = ["Description is required"];
	}

	// TODO: Check for duplicates
	const duplicateSpell = await spellGetByName(newSpell.name);
	if (duplicateSpell) {
		errors.name = ["Spell with this name already exists"];
	}

	if (Object.keys(errors).length > 0) {
		return ErrorResult({
			errors,
			errorDescription: "There are some validation error",
		});
	}

	const db = await openDb();
	let newId;
	try {
		newId = await writeToStore(db, "spells", newSpell);
	} catch (error) {
		console.error(error);
		return ErrorResult({
			errorDescription: "Failed to write to database",
		});
	}

	return SuccessResult(newId);
}
