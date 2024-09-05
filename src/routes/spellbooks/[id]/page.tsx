import ButtonLink from "@/components/ui/ButtonLink";
import Spellbook, { SpellSlot } from "@/domain/types/Spellbook";
import { useUserPrefs } from "@/useUserPrefs";
import { Pen, Plus, Trash } from "lucide-react";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export default function SpellbookPage() {
	const { spellbook } = useLoaderData() as {
		spellbook: Spellbook;
	};
	const { setUserPrefs } = useUserPrefs();

	useEffect(() => {
		setUserPrefs({ activeCharacterId: spellbook.id });
	}, [spellbook.id, setUserPrefs]);

	console.log(spellbook);

	return (
		<div>
			<div className="flex justify-between gap-2">
				<h1 className="text-xl mr-auto">{spellbook.name}'s Spellbook</h1>
				<ButtonLink to={`/spellbooks/${spellbook.id}/edit`} variant="success">
					<Pen className="w-4 h-4 mr-2" />
					Edit Spellbook
				</ButtonLink>
				<ButtonLink to={`/spellbooks/${spellbook.id}/delete`} variant="danger">
					<Trash className="w-4 h-4 mr-2" />
					Delete Spellbook
				</ButtonLink>
				<ButtonLink to={`/spellbooks/`} variant="warning">
					Switch Character
				</ButtonLink>
			</div>

			<h2>Spell Slots</h2>
			{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
				<PreparedSpellSlots
					key={level}
					slots={spellbook.spellSlots[level]}
					level={level}
				/>
			))}

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

function PreparedSpellSlots({
	slots,
	level,
}: {
	slots: SpellSlot[];
	level: number;
}) {
	if (slots.length === 0) {
		return null;
	}

	const isCantrip = level === 0;

	return (
		<div>
			<h3>{isCantrip ? "Cantrips" : `Level ${level}`} </h3>
			<ul>
				{slots.map((slot) => (
					<li
						key={slot.id}
						className="w-72 h-9 border bg-secondary-400 border-secondary-600 my-1 rounded-md p-2"
					>
						{slot.preparedSpellId ?? "Empty"}
					</li>
				))}
			</ul>
		</div>
	);
}
