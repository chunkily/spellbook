export interface Spell {
	id: number;
	name: string;
	level: number;
	traits: string[];
	traditions: string[];
	castAction: string;
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

export interface HeightenedEffect {
	add: number; // +1, +2
	level: number; // 3rd, 4th
	effect: string;
}
