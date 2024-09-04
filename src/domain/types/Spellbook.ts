import Spell from "./Spell";

export default interface Spellbook {
	id: number;
	name: string;
	tradition: string;
	kind: "prepared" | "spontaneous";
	learnedSpells: Spell[];
	spellSlots: SpellSlot[];
}

interface SpellSlot {
	level: number;
	preparedSpellId?: number;
	special?: string;
}
