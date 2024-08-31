import { Spell } from "@/domain/types/Spell";
import { useLoaderData } from "react-router-dom";

export default function SpellPage() {
	const { spell } = useLoaderData() as { spell: Spell };

	return (
		<div>
			<h1>{spell.name}</h1>
			<p>{spell.description}</p>
		</div>
	);
}
