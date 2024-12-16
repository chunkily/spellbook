export default interface HeightenedEffect {
	add: number; // +1, +2
	level: number; // 3rd, 4th
	effect: string;
}

function isHeightenedEffect(obj: any): obj is HeightenedEffect {
	return (
		typeof obj === "object" &&
		obj !== null &&
		typeof obj.add === "number" &&
		typeof obj.level === "number" &&
		typeof obj.effect === "string"
	);
}

export function isHeightenedEffectArray(obj: any): obj is HeightenedEffect[] {
	return Array.isArray(obj) && obj.every(isHeightenedEffect);
}
