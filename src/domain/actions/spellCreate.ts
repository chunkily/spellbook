import db from "@/utils/db";
import ResultOrError, { ErrorResult, SuccessResult } from "../ResultOrError";
import Spell from "../types/Spell";
import spellGetByName from "./spellGetByName";

interface SpellCreateError {
	errors?: Record<string, string[]>;
	errorDescription: string;
}

interface SpellCreateParams {
	name?: string;
	level?: string;
	traits?: string[];
	traditions?: string[];
	castAction?: string;
	castActionOther?: string;
	castTrigger?: string;
	castCost?: {
		somatic: boolean;
		material: boolean;
		verbal: boolean;
		otherCheckbox: boolean;
		other?: string;
	};
	range?: string;
	area?: string;
	targets?: string;
	savingThrow?: string;
	duration?: string;
	description?: string;
	heightenedEffects?: {
		add: number;
		level: number;
		effect: string;
	}[];
}

export default async function spellCreate(
	fields: SpellCreateParams,
): Promise<ResultOrError<number, SpellCreateError>> {
	const errors: Record<string, string[]> = {};
	if (!fields.name) {
		errors.name = ["Name is required"];
	}
	if (!fields.description) {
		errors.description = ["Description is required"];
	}
	if (!fields.level) {
		errors.level = ["Level is required"];
	}
	const level = parseInt(fields.level || "-1", 10);
	if (isNaN(level)) {
		errors.level = ["Level must be a number"];
	} else if (level < 0 || level > 10) {
		errors.level = ["Level is invalid"];
	}

	const castAction =
		fields.castAction === "other" ? fields.castActionOther : fields.castAction;

	if (!castAction) {
		errors.castAction = ["Cast action is required"];
		errors.castActionOther = ["Cast action is required"];
	}

	const castCost = {
		somatic: fields.castCost?.somatic ?? false,
		material: fields.castCost?.material ?? false,
		verbal: fields.castCost?.verbal ?? false,
		other: (fields.castCost?.otherCheckbox ? fields.castCost.other : "") ?? "",
	};

	// Check for duplicate name
	const duplicateSpell = await spellGetByName(fields.name);
	if (duplicateSpell) {
		errors.name = ["Spell with this name already exists"];
	}

	if (Object.keys(errors).length > 0) {
		return ErrorResult({
			errors,
			errorDescription: "There are some validation errors",
		});
	}

	const newSpell: Omit<Spell, "id"> = {
		name: fields.name ?? "",
		level,
		traits: fields.traits || [],
		traditions: fields.traditions || [],
		castAction: castAction ?? "",
		castTrigger: fields.castTrigger ?? "",
		castCost: castCost,
		range: fields.range ?? "",
		area: fields.area ?? "",
		targets: fields.targets ?? "",
		savingThrow: fields.savingThrow ?? "",
		duration: fields.duration ?? "",
		description: fields.description ?? "",
		heightenedEffects: fields.heightenedEffects || [],
		source: "",
	};

	let newId;
	try {
		newId = await db.spells.add(newSpell);
	} catch (error) {
		console.error(error);
		return ErrorResult({
			errorDescription: "Failed to write to database",
		});
	}

	return SuccessResult(newId);
}
