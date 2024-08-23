import ButtonLink from "@/components/ButtonLink";
import { Plus } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";

export default function SpellbooksIndex() {
	const { spellbooks } = useLoaderData() as {
		spellbooks: { id: string; name: string }[];
	};

	return (
		<div>
			<ul className="mb-3 max-w-lg">
				{spellbooks.map((spellbook) => (
					<li key={spellbook.id} className="">
						<Link
							className="bg-primary-300 rounded inline-block w-full hover:bg-primary-400 active:bg-primary-600 px-3 py-2"
							to={`/spellbooks/${spellbook.id}`}
						>
							{spellbook.name}
						</Link>
					</li>
				))}
			</ul>
			<ButtonLink to="/spellbooks/new">
				<Plus className="h-4 w-4 mr-2" />
				New Spellbook
			</ButtonLink>
		</div>
	);
}
