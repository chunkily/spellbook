import FormContextProvider from "@/components/form/FormContextProvider";
import useFormContext from "@/components/form/useFormContext";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import SearchableSelectField from "@/components/ui/SearchableSelectField";
import { Form, useActionData, useFetcher, useLoaderData } from "react-router";
import loader from "./loader";
import ErrorList from "@/components/ui/ErrorList";
import { useEffect, useState } from "react";
import Spell from "@/domain/types/Spell";
import { SearchableOption } from "@/components/ui/Option";

export default function SpellbookLearnPage() {
	const { id, learnedSpells: initialLearnedSpells } =
		useLoaderData<typeof loader>();
	const actionData = useActionData<{
		error: string;
	}>();

	const optionsFetcher = useFetcher<SearchableOption[]>();
	const spellFetcher = useFetcher<{ spell: Spell }>();

	const formContext = useFormContext();

	const [learnedSpells, setLearnedSpells] =
		useState<Spell[]>(initialLearnedSpells);

	const selectedSpellId = formContext.getField("spell");
	const selectedSpell = spellFetcher.data?.spell;

	useEffect(() => {
		if (optionsFetcher.state === "idle" && optionsFetcher.data === undefined) {
			optionsFetcher.load(`/spellbooks/${id}/learn/options`);
		}
	}, [optionsFetcher, id]);

	useEffect(() => {
		if (spellFetcher.state === "idle" && selectedSpellId) {
			spellFetcher.load(`/spells/${selectedSpellId}`);
		}
	}, [selectedSpellId, spellFetcher, selectedSpell]);

	const handleAddSpell = () => {
		if (selectedSpell) {
			setLearnedSpells([...learnedSpells, selectedSpell]);
			formContext.setField("spell", "");
		}
	};

	const handleRemoveSpell = (spell: Spell) => {
		setLearnedSpells(learnedSpells.filter((s) => s.id !== spell.id));
	};

	const options = (optionsFetcher.data ?? []).filter(
		(opt) => !learnedSpells.find((spell) => spell.id === opt.value),
	);

	return (
		<div key={id}>
			<FormContextProvider formContext={formContext}>
				<SearchableSelectField label="Spell" name="spell" items={options} />
				<div>
					<Button
						variant="success"
						disabled={selectedSpell === undefined || selectedSpellId === ""}
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
						{spell.name}
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
					<ButtonLink to={`/spellbooks/${id}`} variant="warning">
						Cancel
					</ButtonLink>
					<ErrorList errors={[actionData?.error]} />
				</div>
			</Form>
		</div>
	);
}
