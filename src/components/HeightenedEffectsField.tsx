import { HeightenedEffect } from "@/domain/types/Spell";
import { useServerStateArray } from "@/utils/useServerState";
import ErrorList from "./ui/ErrorList";
import Button from "./ui/Button";
import Select from "./ui/Select";
import TextInput from "./ui/TextInput";
import { X } from "lucide-react";

interface HeightenedEffectsFieldProps {
	name: string;
	serverValues?: HeightenedEffect[];
	serverErrors?: string[];
}

interface HeightenedEffectState {
	id: number;
	select: string;
	effect: string;
}

export default function HeightenedEffectsField({
	serverValues,
	serverErrors,
	name,
}: HeightenedEffectsFieldProps) {
	const [heightenedEffects, setHeightenedEffects] =
		useServerStateArray<HeightenedEffectState>(
			serverValues?.map((h, idx) => ({
				id: idx,
				select: h.add ? `+${h.add}` : h.level.toString(),
				effect: h.effect,
			})) ?? [],
		);
	const [errors, setErrors] = useServerStateArray(serverErrors ?? []);

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

	const jsonValues = JSON.stringify(
		heightenedEffects.map((h) => {
			const isAdd = h.select.startsWith("+");

			const add = isAdd ? parseInt(h.select) : 0;
			const level = isAdd ? 0 : parseInt(h.select);

			return {
				add,
				level,
				effect: h.effect,
			};
		}),
	);

	return (
		<div className="max-w-lg mb-3">
			<fieldset
				onChange={() => {
					setErrors([]);
				}}
			>
				<legend className="text-sm mb-1">Heightened Effects</legend>
				{heightenedEffects.map((h) => (
					<div className="flex mb-2 gap-1">
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
			<input type="hidden" name={name} value={jsonValues} />
			{hasErrors ? <ErrorList errors={errors} /> : null}
		</div>
	);
}
