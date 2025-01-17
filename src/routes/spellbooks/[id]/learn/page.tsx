import FormContextProvider from "@/components/form/FormContextProvider";
import useFormContext from "@/components/form/useFormContext";
import Button from "@/components/ui/Button";
import SearchableSelectField from "@/components/ui/SearchableSelectField";
import { Form, useActionData, useLoaderData, useNavigate } from "react-router";
import loader from "./loader";
import ErrorList from "@/components/ui/ErrorList";
import { useState } from "react";
import Spell from "@/domain/types/Spell";
import SpellDisplay from "@/components/SpellDisplay";

export default function SpellbookLearnPage() {
	const { id, allSpells, learnedSpellIds, options } =
		useLoaderData<typeof loader>();
	const actionData = useActionData<{
		error: string;
	}>();
	const navigate = useNavigate();
	const formContext = useFormContext();

	const [selectedSpell, setSelectedSpell] = useState<Spell | undefined>();
	const [learnedSpells, setLearnedSpells] = useState<Spell[]>([
		...allSpells.filter((spell) => learnedSpellIds.includes(spell.id)),
	]);

	const handleAddSpell = () => {
		if (selectedSpell) {
			setLearnedSpells([...learnedSpells, selectedSpell]);
			setSelectedSpell(undefined);
			formContext.setField("spell", "");
		}
	};

	const handleRemoveSpell = (spell: Spell) => {
		setLearnedSpells(learnedSpells.filter((s) => s.id !== spell.id));
	};

	const filteredOptions = options.filter(
		(option) => !learnedSpells.find((s) => s.id === option.value),
	);

	const canAddSpell =
		selectedSpell !== undefined &&
		learnedSpells.find((s) => s.id === selectedSpell.id) === undefined;

	return (
		<div className="flex">
			<div key={id} className="md:w-1/2">
				<FormContextProvider formContext={formContext}>
					<SearchableSelectField
						label="Spell"
						name="spell"
						items={filteredOptions}
						onSelectedItemChange={(value) => {
							const spell = allSpells.find((s) => s.id === value);
							setSelectedSpell(spell);
						}}
					/>
					<div>
						<Button
							variant="success"
							disabled={!canAddSpell}
							onClick={handleAddSpell}
						>
							Add spell
						</Button>
					</div>
				</FormContextProvider>

				<p>Learned spells:</p>
				<ul>
					{learnedSpells.map((spell) => (
						<li key={spell.id}>
							<button
								onClick={() => setSelectedSpell(spell)}
								className="underline"
							>
								{spell.name}
							</button>

							<Button
								className="ml-2"
								title="remove"
								variant="danger"
								onClick={() => handleRemoveSpell(spell)}
							>
								X
							</Button>
						</li>
					))}
				</ul>

				<Form className="max-w-lg" method="post">
					<div className="flex justify-between gap-2">
						<input
							type="hidden"
							name="spells"
							value={learnedSpells.map((s) => s.id)}
						/>
						<Button variant="success">Save</Button>
						<Button
							type="button"
							onClick={() => navigate(-1)}
							variant="warning"
						>
							Cancel
						</Button>
						<ErrorList errors={[actionData?.error]} />
					</div>
				</Form>
			</div>
			<div className="hidden md:block w-1/2">
				{selectedSpell && <SpellDisplay spell={selectedSpell} />}
			</div>
		</div>
	);
}
