import db from "@/utils/db";
import Spell from "../types/Spell";
import Spellbook from "../types/Spellbook";

export default async function exportData({
	includeSpells,
	includeSpellbooks,
	includeTraits,
}: {
	includeSpells: boolean;
	includeSpellbooks: boolean;
	includeTraits: boolean;
}) {
	let spells: Spell[] | undefined;
	let spellbooks: Spellbook[] | undefined = undefined;
	let traits: string[] | undefined = undefined;

	if (includeSpells) {
		spells = await db.spells.toArray();
	}

	if (includeSpellbooks) {
		spellbooks = await db.spellbooks.toArray();
	}

	if (includeTraits) {
		traits = await db.traits
			.toArray()
			.then((traits) => traits.map((trait) => trait.name));
	}

	return {
		spells,
		spellbooks,
		traits,
	};
}
