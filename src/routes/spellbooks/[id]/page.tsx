import { Link, useLoaderData } from "react-router-dom";

export default function SpellbookPage() {
	const { spellbook } = useLoaderData() as {
		spellbook: { id: string; name: string };
	};

	return (
		<div>
			<h1>Spellbook name: {spellbook.name}</h1>
			<Link to={`/spellbooks/${spellbook.id}/delete`}>Delete</Link>

			<h2>Spell List</h2>
			<ul>
				<li>Spell 1</li>
				<li>Spell 2</li>
				<li>Spell 3</li>
			</ul>
		</div>
	);
}
