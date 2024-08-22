import { useLoaderData } from "react-router-dom";

export default function SpellbookPage() {
	const { spellbook } = useLoaderData() as {
		spellbook: { id: string; name: string };
	};

	return (
		<div>
			<h1>{spellbook.name}</h1>
		</div>
	);
}
