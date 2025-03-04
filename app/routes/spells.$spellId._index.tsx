import SpellDisplay from "@/components/SpellDisplay";
import ButtonLink from "@/components/ui/ButtonLink";
import { Pencil, Trash } from "lucide-react";
import type { Route } from "./+types/spells.$spellId._index";
import db from "@/utils/db";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
	const spellId = params.spellId;

	const spell = await db.spells.get(spellId);

	if (!spell) {
		throw new Error("Spell not found");
	}

	return {
		spell,
	};
}

export default function SpellDetailsPage({ loaderData }: Route.ComponentProps) {
	const { spell } = loaderData;

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
					<Trash className="w-4 h-4 mr-2" />
					Delete
				</ButtonLink>
				<ButtonLink to={`/spells/${spell.id}/edit`} variant="success">
					<Pencil className="w-4 h-4 mr-2" />
					Edit
				</ButtonLink>
			</div>
		</div>
	);
}
