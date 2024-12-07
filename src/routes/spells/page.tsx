import ButtonLink from "@/components/ui/ButtonLink";
import RadioField from "@/components/ui/RadioField";
import TextField from "@/components/ui/TextField";
import useRadioField from "@/components/ui/useRadioField";
import useTextField from "@/components/ui/useTextField";
import { SpellSearchResponse } from "@/domain/actions/spellSearch";
import Spell from "@/domain/types/Spell";
import {
	Plus,
	ArrowDownAZ,
	ArrowDownZA,
	ArrowDown01,
	ArrowDown10,
} from "lucide-react";
import { Form, Link, useLoaderData, useSubmit } from "react-router-dom";

export default function SpellsPage() {
	const { response, searchFields } = useLoaderData() as {
		response: SpellSearchResponse;
		searchFields: { q: string | undefined; sort: string | undefined };
	};
	const submit = useSubmit();

	const keys = Object.keys(response);

	return (
		<div>
			<h1 className="text-xl">Spell List</h1>
			<Form
				method="get"
				onChange={(e) => {
					submit(e.currentTarget, {
						replace: true,
					});
				}}
			>
				<TextField
					label="Search"
					name="q"
					type="search"
					{...useTextField({
						serverValue: searchFields.q,
					})}
				/>
				<RadioField
					name={"sort"}
					label={"Sort"}
					items={[
						{ label: <ArrowDownAZ className="inline-block" />, value: "name" },
						{ label: <ArrowDownZA className="inline-block" />, value: "-name" },
						{ label: <ArrowDown01 className="inline-block" />, value: "level" },
						{
							label: <ArrowDown10 className="inline-block" />,
							value: "-level",
						},
					]}
					{...useRadioField({
						serverValue: searchFields.sort,
					})}
				/>
			</Form>
			<div className="fixed bottom-5 right-5">
				<ButtonLink to="/spells/new">
					<Plus className="w-4 h-4 mr-2" />
					Add New Spell
				</ButtonLink>
			</div>
			<ul>
				{keys.map((key) => (
					<SpellList key={key} group={key} spells={response[key]} />
				))}
				{keys.length === 0 && <li>No spells found</li>}
			</ul>
		</div>
	);
}

function SpellList({ spells, group }: { spells: Spell[]; group: string }) {
	return (
		<div className="max-w-lg">
			<h2 className="text-lg font-bold mt-4">{group}</h2>
			<hr className="mb-2 border-black" />
			<ul>
				{spells.map((spell) => (
					<SpellListItem key={spell.id} spell={spell} />
				))}
			</ul>
		</div>
	);
}

function SpellListItem({ spell }: { spell: Spell }) {
	const { id, name, level } = spell;

	const levelText = level === 0 ? "Cantrip" : `Spell ${level}`;

	return (
		<li key={id}>
			<Link to={`/spells/${id}`}>
				<span className="font-bold">{name}</span> ({levelText})
			</Link>
		</li>
	);
}
