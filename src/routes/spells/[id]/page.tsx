import ButtonLink from "@/components/ui/ButtonLink";
import Spell from "@/domain/types/Spell";
import { useLoaderData } from "react-router-dom";

export default function SpellPage() {
	const { spell } = useLoaderData() as { spell: Spell };

	return (
		<div className="flex flex-col">
			<div className="flex flex-row gap-2 justify-end">
				<ButtonLink to="/spells" variant="secondary">
					Back
				</ButtonLink>
				<ButtonLink to={`/spells/${spell.id}/delete`} variant="danger">
					Delete
				</ButtonLink>
				<ButtonLink to={`/spells/${spell.id}/edit`} variant="success">
					Edit
				</ButtonLink>
			</div>
			<div>
				<h1>{spell.name}</h1>
				<h2>{spellLevelToString(spell.level)}</h2>
				<h3>{spell.traits.join(", ")}</h3>
				<p>Traditions: {spell.traditions.join(", ")}</p>
				<SpellCast spell={spell} />
				{spell.range ? <p>Range: {spell.range}</p> : null}
				{spell.area ? <p>Area: {spell.area}</p> : null}
				{spell.targets ? <p>Targets: {spell.targets}</p> : null}
				{spell.savingThrow ? <p>Saving Throw: {spell.savingThrow}</p> : null}
				{spell.duration ? <p>Duration: {spell.duration}</p> : null}
				<p className="max-w-prose whitespace-pre-wrap">{spell.description}</p>
				{spell.heightenedEffects.length > 0
					? spell.heightenedEffects.map((h) => (
							<div key={`${h.add}${h.level}`}>
								<h3>
									Heightened ({heightenedEffectLevelDisplay(h.add, h.level)})
								</h3>
								<p>{h.effect}</p>
							</div>
						))
					: null}
			</div>
		</div>
	);
}

function SpellCast({ spell }: { spell: Spell }) {
	const msv = [];
	if (spell.castCost.material) {
		msv.push("Material");
	}
	if (spell.castCost.somatic) {
		msv.push("Somatic");
	}
	if (spell.castCost.verbal) {
		msv.push("Verbal");
	}

	return (
		<p>
			Cast: {spell.castAction}
			{msv.length > 0 ? ` (${msv.join(", ")})` : ""}
		</p>
	);
}

function spellLevelToString(level: number): string {
	if (level === 0) {
		return "Cantrip 1";
	}
	return `Spell ${level}`;
}

function heightenedEffectLevelDisplay(add: number, level: number): string {
	if (add > 0) {
		return `+${add}`;
	}
	switch (level) {
		case 1:
			return "1st";
		case 2:
			return "2nd";
		case 3:
			return "3rd";
		default:
			return `${level}th`;
	}
}
