import { Spell } from "@/domain/types/Spell";
import { useLoaderData } from "react-router-dom";

export default function SpellsPage() {
	const { spells } = useLoaderData() as { spells: Spell[] };

	return (
		<div>
			<ul>
				{spells.map((spell) => (
					<li key={spell.id}>{spell.name}</li>
				))}
			</ul>
		</div>
	);
}
