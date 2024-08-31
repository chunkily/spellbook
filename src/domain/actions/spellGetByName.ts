import { Spell } from "../types/Spell";
import spellGetAll from "./spellGetAll";

export default async function spellGetByName(
	name: string | undefined,
): Promise<Spell | undefined> {
	if (!name) {
		return undefined;
	}

	// Not the most efficient way to do this, but it's fine for now
	const spells = await spellGetAll();

	const spell = spells.find((spell) => spell.name === name);

	return spell;
}
