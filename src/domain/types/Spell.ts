import HeightenedEffect from "./HeightenedEffect";

export default interface Spell {
	id: string;
	name: string;
	level: number;
	traits: string[];
	traditions: string[];
	castAction: string;
	castTrigger: string;
	castCost: {
		somatic: boolean;
		material: boolean;
		verbal: boolean;
		other: string;
	};
	range: string;
	area: string;
	targets: string;
	savingThrow: string;
	duration: string;
	description: string;
	heightenedEffects: HeightenedEffect[];
	source: string;
}
