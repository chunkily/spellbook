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
	heightened: string; // +1, +2 OR 3rd, 4th
	description: string;
}
