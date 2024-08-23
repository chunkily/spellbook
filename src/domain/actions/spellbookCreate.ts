import { openDb, writeToStore } from "@/utils/indexedDb";
import SuccessOrError, { ErrorResult, SuccessResult } from "../SuccessOrError";

interface SpellbookCreate {
	name?: string;
}

interface SpellbookCreateErrors {
	errors?: Record<string, string[]>;
	errorDescription: string;
}

export default async function spellbookCreate({
	name,
}: SpellbookCreate): Promise<SuccessOrError<number, SpellbookCreateErrors>> {
	const db = await openDb();

	if (!name) {
		return ErrorResult({
			errors: {
				name: ["Name is required"],
			},
			errorDescription: "",
		});
	}

	const spellbook = {
		name: name.trim(),
		learnedSpells: [],
		spellSlots: {
			"0": 0,
			"1": 0,
			"2": 0,
			"3": 0,
			"4": 0,
			"5": 0,
			"6": 0,
			"7": 0,
			"8": 0,
			"9": 0,
		},
	};

	let newId;
	try {
		newId = await writeToStore(db, "spellbooks", spellbook);
	} catch (error) {
		console.error(error);
		return ErrorResult({
			errorDescription: "There was an error saving the data",
		});
	}

	return SuccessResult(newId);
}
