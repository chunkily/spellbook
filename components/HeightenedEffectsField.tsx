import ErrorList from "./ui/ErrorList";
import Button from "./ui/Button";
import Select from "./ui/Select";
import TextInput from "./ui/TextInput";
import { X } from "lucide-react";
import useFormField from "./form/useFormField";
import type HeightenedEffect from "@/domain/types/HeightenedEffect";

interface HeightenedEffectsFieldProps {
	name: string;
}

export interface HeightenedEffectState {
	id: number;
	select: string;
	effect: string;
}

function transformStateToHeightenedEffectsJson(state: HeightenedEffectState[]) {
	const values = state.map((h) => ({
		add: parseInt(h.select.replace("+", ""), 10),
		level: parseInt(h.select, 10) || 0,
		effect: h.effect,
	}));

	return JSON.stringify(values);
}

export default function HeightenedEffectsField({
	name,
}: HeightenedEffectsFieldProps) {
	const field = useFormField(name);

	const heightenedEffects = JSON.parse(field.value) as HeightenedEffectState[];

	const setHeightenedEffects = (value: HeightenedEffectState[]) => {
		field.onValueChange(JSON.stringify(value));
	};

	const errors = field.errors;
	const hasErrors = errors.length > 0;

	const handleAdd = () => {
		const maxId = Math.max(...heightenedEffects.map((h) => h.id), 0);

		setHeightenedEffects([
			...heightenedEffects,
			{ id: maxId + 1, select: "+1", effect: "" },
		]);
	};

	const handleRemove = (id: number) => {
		setHeightenedEffects(heightenedEffects.filter((h) => h.id !== id));
	};

	const handleSelectChange = (id: number, value: string) => {
		setHeightenedEffects(
			heightenedEffects.map((h) => (h.id === id ? { ...h, select: value } : h)),
		);
	};

	const handleEffectChange = (id: number, value: string) => {
		setHeightenedEffects(
			heightenedEffects.map((h) => (h.id === id ? { ...h, effect: value } : h)),
		);
	};

	return (
		<div className="max-w-lg mb-3">
			<fieldset
				onChange={() => {
					field.setErrors([]);
				}}
			>
				<legend className="text-sm mb-1">Heightened Effects</legend>
				{heightenedEffects.map((h) => (
					<div className="flex mb-2 gap-1" key={h.id}>
						<Select
							className="w-2/12"
							value={h.select}
							onChange={(e) => handleSelectChange(h.id, e.target.value)}
						>
							<option value="+1">+1</option>
							<option value="+2">+2</option>
							<option value="+3">+3</option>
							<option value="+4">+4</option>
							<option value="+5">+5</option>
							<option value="+6">+6</option>
							<option value="+7">+7</option>
							<option value="+8">+8</option>
							<option value="+9">+9</option>
							<option value="2">2nd</option>
							<option value="3">3rd</option>
							<option value="4">4th</option>
							<option value="5">5th</option>
							<option value="6">6th</option>
							<option value="7">7th</option>
							<option value="8">8th</option>
							<option value="9">9th</option>
							<option value="10">10th</option>
						</Select>
						<TextInput
							value={h.effect}
							onChange={(e) => handleEffectChange(h.id, e.target.value)}
						></TextInput>
						<Button
							className="px-3"
							type="button"
							variant="danger"
							onClick={() => handleRemove(h.id)}
						>
							<X className="inline-block w-4 h-4" />
						</Button>
					</div>
				))}
				<Button type="button" onClick={handleAdd}>
					Add Heightened Effect
				</Button>
			</fieldset>
			<input
				type="hidden"
				name={name}
				value={transformStateToHeightenedEffectsJson(heightenedEffects)}
			/>
			{hasErrors ? <ErrorList errors={errors} /> : null}
		</div>
	);
}

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
