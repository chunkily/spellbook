export default interface HeightenedEffect {
	add: number; // +1, +2
	level: number; // 3rd, 4th
	effect: string;
}

function isHeightenedEffect(obj: unknown): obj is HeightenedEffect {
	return (
		typeof obj === "object" &&
		obj !== null &&
		"add" in obj &&
		typeof obj.add === "number" &&
		"level" in obj &&
		typeof obj.level === "number" &&
		"effect" in obj &&
		typeof obj.effect === "string"
	);
}

export function isHeightenedEffectArray(
	obj: unknown,
): obj is HeightenedEffect[] {
	return Array.isArray(obj) && obj.every(isHeightenedEffect);
}
