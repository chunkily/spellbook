import Spell from "./Spell";

export default interface Spellbook {
	id: number;
	name: string;
	learnedSpells: Spell[];
	spellSlots: SpellSlots;
}

interface SpellSlots {
	"0": number;
	"1": number;
	"2": number;
	"3": number;
	"4": number;
	"5": number;
	"6": number;
	"7": number;
	"8": number;
	"9": number;
}
