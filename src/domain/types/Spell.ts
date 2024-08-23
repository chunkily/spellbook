export interface Spell {
	id: number;
	name: string;
	traditions: string[];
	traits: string[];
	level: number;
	isCantrip: boolean;
	description: string;
	heightenedEffects: HeightenedEffect[];
	actions?: number;
	range?: string;
	area?: string;
	defense?: string;
	castingTime?: string;
	source: string;
}

export interface HeightenedEffect {
	level: number;
	description: string;
}
