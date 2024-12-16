import HeightenedEffect from "@/domain/types/HeightenedEffect";
import { HeightenedEffectState } from "./HeightenedEffectsField";

export function transformHeightenedEffectsToJson(
	heightenedEffects?: HeightenedEffect[],
) {
	if (!heightenedEffects) {
		return "[]";
	}

	const state: HeightenedEffectState[] = heightenedEffects.map((h, i) => ({
		id: i,
		select: h.add ? `+${h.add}` : h.level.toString(),
		effect: h.effect,
	}));

	return JSON.stringify(state);
}
