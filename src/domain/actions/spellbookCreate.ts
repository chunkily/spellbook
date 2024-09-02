import db from "@/utils/db";
import ResultOrError, { ErrorResult, SuccessResult } from "../ResultOrError";
import Spellbook from "../types/Spellbook";

interface SpellbookCreate {
	name?: string;
}

interface SpellbookCreateErrors {
	errors?: Record<string, string[]>;
	errorDescription: string;
}

export default async function spellbookCreate({
	name,
}: SpellbookCreate): Promise<ResultOrError<number, SpellbookCreateErrors>> {
	if (!name) {
		return ErrorResult({
			errors: {
				name: ["Name is required"],
			},
			errorDescription: "There are some validation errors",
		});
	}

	const spellbook: Omit<Spellbook, "id"> = {
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
