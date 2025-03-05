import ButtonLink from "@/components/ui/ButtonLink";
import { type SpellSlot } from "@/domain/types/Spellbook";
import { useUserPrefs } from "@/utils/useUserPrefs";
import { Pen, Trash, Wand } from "lucide-react";
import { useEffect, useState } from "react";
import type Spell from "@/domain/types/Spell";
import SpellDisplay from "@/components/SpellDisplay";
import spellbookGetById from "@/domain/actions/spellbookGetById";
import spellsGetByIds from "@/domain/actions/spellsGetByIds";
import type { Route } from "./+types/spellbooks.$spellbookId._index";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
	const spellbookId = params.spellbookId;

	const spellbook = await spellbookGetById(spellbookId);

	if (!spellbook) {
		throw new Error("Spellbook not found");
	}

	const learnedSpells = await spellsGetByIds(spellbook.learnedSpellIds);

	return {
		spellbook,
		learnedSpells,
	};
}

export default function SpellbookDetailsPage({
	loaderData,
}: Route.ComponentProps) {
	const { spellbook, learnedSpells } = loaderData;
	const [displayedSpell, setDisplayedSpell] = useState<Spell | null>(null);

	const { setUserPrefs } = useUserPrefs();

	useEffect(() => {
		setUserPrefs({ activeCharacterId: spellbook.id });
	}, [spellbook.id, setUserPrefs]);

	function handlePreview(spellId?: string) {
		if (spellId) {
			const spell = learnedSpells.find((s) => s.id === spellId);
			if (spell) {
				setDisplayedSpell(spell);
			}
		} else {
			setDisplayedSpell(null);
		}
	}

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

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="overflow-auto max-h-screen">
					<h2>Spell Slots</h2>
					{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
						<PreparedSpellSlots
							key={level}
							slots={spellbook.spellSlots[level]}
							level={level}
							onPreview={handlePreview}
							learnedSpells={learnedSpells}
						/>
					))}
				</div>
				<div>
					{displayedSpell && (
						<SpellDisplay spell={displayedSpell}></SpellDisplay>
					)}
				</div>
			</div>
			<div className="fixed bottom-5 right-5">
				<ButtonLink
					to={`/spellbooks/${spellbook.id}/prepare`}
					variant="primary"
				>
					<Wand className="h-4 w-4 mr-2" />
					Prepare Spells
				</ButtonLink>
			</div>
		</div>
	);
}

function PreparedSpellSlots({
	slots,
	level,
	onPreview,
	learnedSpells,
}: {
	slots: SpellSlot[];
	level: number;
	onPreview: (spellId?: string) => void;
	learnedSpells: Spell[];
}) {
	if (slots.length === 0) {
		return null;
	}

	const isCantrip = level === 0;

	return (
		<div>
			<h3>{isCantrip ? "Cantrips" : `Level ${level}`} </h3>
			<ul>
				{slots.map((slot) => {
					const preparedSpell = learnedSpells.find(
						(s) => s.id === slot.preparedSpellId,
					);
					return (
						<li key={slot.id}>
							<button
								className="w-72 h-9 text-left border bg-secondary-400 border-secondary-600 my-1 rounded-md p-2"
								onClick={() => onPreview(slot.preparedSpellId)}
							>
								{preparedSpell?.name ?? "Empty"}
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
