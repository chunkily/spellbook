import ButtonLink from "@/components/ui/ButtonLink";
import { useUserPrefs } from "@/useUserPrefs";
import { Pen, Plus, Trash } from "lucide-react";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export default function SpellbookPage() {
	const { spellbook } = useLoaderData() as {
		spellbook: { id: number; name: string };
	};
	const { setUserPrefs } = useUserPrefs();

	useEffect(() => {
		setUserPrefs({ activeCharacterId: spellbook.id });
	}, [spellbook.id, setUserPrefs]);

	return (
		<div>
			<div className="flex justify-between gap-2">
				<h1 className="text-xl mr-auto">{spellbook.name}'s Spellbook</h1>
				<ButtonLink to={`/spellbooks/${spellbook.id}/edit`} variant="success">
					<Pen className="h-4 w-4 mr-2" />
					Edit Spellbook
				</ButtonLink>
				<ButtonLink to={`/spellbooks/${spellbook.id}/delete`} variant="danger">
					<Trash className="h-4 w-4 mr-2" />
					Delete Spellbook
				</ButtonLink>
				<ButtonLink to={`/spellbooks/`} variant="warning">
					Switch Character
				</ButtonLink>
			</div>

			<h2>Prepared Spells</h2>

			<h2>Learned Spells</h2>
			<ul>
				<li>Spell 1</li>
				<li>Spell 2</li>
				<li>Spell 3</li>
			</ul>
			<ButtonLink to={`/spellbooks/${spellbook.id}/learn`} variant="primary">
				<Plus className="h-4 w-4 mr-2" />
				Add a Spell to the Spellbook
			</ButtonLink>
		</div>
	);
}
