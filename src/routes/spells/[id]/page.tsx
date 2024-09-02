import SpellDisplay from "@/components/SpellDisplay";
import ButtonLink from "@/components/ui/ButtonLink";
import Spell from "@/domain/types/Spell";
import { useLoaderData } from "react-router-dom";

export default function SpellPage() {
	const { spell } = useLoaderData() as { spell: Spell };

	return (
		<div className="flex flex-col max-w-xl">
			<div className="flex flex-row gap-2 mb-3">
				<ButtonLink to="/spells" variant="secondary">
					Back
				</ButtonLink>
			</div>
			<SpellDisplay spell={spell} />
			<div className="flex flex-row gap-2 mb-4">
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
		</div>
	);
}
