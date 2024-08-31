import MaybeError from "../MaybeError";

interface SpellEditError {
	errors?: Record<string, string[]>;
	errorDescription: string;
}

interface SpellEditParams {
	name: string | undefined;
	description: string | undefined;
	level: string | undefined;
}

export default async function spellEdit(
	_id: string,
	_fields: SpellEditParams,
): Promise<MaybeError<SpellEditError>> {
	throw new Error("Not implemented");
}
