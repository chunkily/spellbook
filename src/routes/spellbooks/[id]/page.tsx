import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "@/components/ui/Modal";
import Spell from "@/domain/types/Spell";
import Spellbook, { SpellSlot } from "@/domain/types/Spellbook";
import { useUserPrefs } from "@/useUserPrefs";
import { Pen, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";

export default function SpellbookPage() {
	const { spellbook } = useLoaderData() as {
		spellbook: Spellbook;
	};
	const [spellToRemove, setSpellToRemove] = useState<Spell | null>(null);

	const { setUserPrefs } = useUserPrefs();

	useEffect(() => {
		setUserPrefs({ activeCharacterId: spellbook.id });
	}, [spellbook.id, setUserPrefs]);

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
				{spellbook.learnedSpells.map((spell) => (
					<li key={spell.id}>
						{spell.name}
						<Button
							className="ml-2"
							title="remove"
							variant="danger"
							onClick={() => setSpellToRemove(spell)}
						>
							<Trash className="w-4 h-4" />
						</Button>
					</li>
				))}
			</ul>
			<ButtonLink to={`/spellbooks/${spellbook.id}/learn`} variant="primary">
				<Plus className="h-4 w-4 mr-2" />
				Add a Spell to the Spellbook
			</ButtonLink>
			<Modal
				isOpen={spellToRemove !== null}
				onClose={() => setSpellToRemove(null)}
			>
				<ModalHeader>Remove Spell</ModalHeader>
				<ModalBody>
					<div className="p-4">
						<h2>Are you sure you want to remove {spellToRemove?.name}?</h2>
						<div className="flex justify-between gap-2"></div>
					</div>
				</ModalBody>
				<ModalFooter>
					<div className="flex gap-1">
						<Form
							method="post"
							onSubmit={() => {
								setSpellToRemove(null);
							}}
						>
							<input type="hidden" name="spellId" value={spellToRemove?.id} />
							<input type="hidden" name="action" value="remove" />
							<Button type="submit" variant="danger">
								Remove
							</Button>
						</Form>
						<Button
							className="ml-auto"
							variant="secondary"
							onClick={() => {
								setSpellToRemove(null);
							}}
						>
							Cancel
						</Button>
					</div>
				</ModalFooter>
			</Modal>
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
