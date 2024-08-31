import ButtonLink from "@/components/ButtonLink";
import { Spell } from "@/domain/types/Spell";
import { Plus } from "lucide-react";
import { useLoaderData } from "react-router-dom";

export default function SpellsPage() {
	const { spells } = useLoaderData() as { spells: Spell[] };

	return (
		<div>
			<div className="fixed bottom-5 right-5">
				<ButtonLink to="/spells/new">
					<Plus className="h-4 w-4 mr-2" />
					Add New Spell
				</ButtonLink>
			</div>
			<ul>
				{spells.map((spell) => (
					<li key={spell.id}>{spell.name}</li>
				))}
			</ul>
		</div>
	);
}
