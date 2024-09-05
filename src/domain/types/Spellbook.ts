import Spell from "./Spell";

export default interface Spellbook {
	id: number;
	name: string;
	tradition: string;
	kind: "prepared" | "spontaneous";
	learnedSpells: Spell[];
	spellSlots: SpellSlots;
}

export type SpellSlots = [
	SpellSlot[], // Cantrips
	SpellSlot[], // Level 1
	SpellSlot[], // Level 2
	SpellSlot[], // Level 3
	SpellSlot[], // Level 4
	SpellSlot[], // Level 5
	SpellSlot[], // Level 6
	SpellSlot[], // Level 7
	SpellSlot[], // Level 8
	SpellSlot[], // Level 9
	SpellSlot[], // Level 10
];

export interface SpellSlot {
	id: string;
	level: number;
	preparedSpellId?: number;
	special?: string;
}
