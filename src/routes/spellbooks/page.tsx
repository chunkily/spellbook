import { Link, useLoaderData } from "react-router-dom";

export default function SpellbooksIndex() {
	const { spellbooks } = useLoaderData() as {
		spellbooks: { id: string; name: string }[];
	};

	return (
		<div>
			<ul>
				{spellbooks.map((spellbook) => (
					<li key={spellbook.id}>
						<Link to={`/spellbooks/${spellbook.id}`}>{spellbook.name}</Link>
					</li>
				))}
			</ul>
			<Link to="/spellbooks/new">New Spellbook</Link>
		</div>
	);
}
