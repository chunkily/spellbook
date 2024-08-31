import ButtonLink from "@/components/ButtonLink";
import { Spell } from "@/domain/types/Spell";
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
				<ButtonLink to={`/spells/${spell.id}/edit`}>Edit</ButtonLink>
			</div>
			<div>
				<h1>{spell.name}</h1>
				<h2>{spellLevelToString(spell.level)}</h2>
				<p className="max-w-prose">{spell.description}</p>
			</div>
		</div>
	);
}

function spellLevelToString(level: number): string {
	if (level === 0) {
		return "Cantrip 1";
	}
	return `Spell ${level}`;
}
