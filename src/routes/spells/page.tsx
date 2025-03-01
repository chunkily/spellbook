import ButtonLink from "@/components/ui/ButtonLink";
import useFormContext from "@/components/form/useFormContext";
import FormContextProvider from "@/components/form/FormContextProvider";
import TextField from "@/components/ui/TextField";
import Spell from "@/domain/types/Spell";
import {
	Plus,
	ArrowDownAZ,
	ArrowDownZA,
	ArrowDown01,
	ArrowDown10,
} from "lucide-react";
import { Form, Link, useLoaderData, useSubmit } from "react-router";
import RadioField from "@/components/ui/RadioField";
import loader from "./loader";
import { SrOnlyLabel } from "@/components/ui/Label";

export default function SpellsPage() {
	const { response, searchFields } = useLoaderData<typeof loader>();
	const submit = useSubmit();

	const formContext = useFormContext({
		serverValues: searchFields,
	});

	const keys = Object.keys(response);

	return (
		<div>
			<h1 className="text-xl">Spell List</h1>
			<FormContextProvider formContext={formContext}>
				<Form
					method="get"
					onChange={(e) => {
						submit(e.currentTarget, {
							replace: true,
						});
					}}
				>
					<TextField
						id="search"
						label={<SrOnlyLabel htmlFor="search">Search</SrOnlyLabel>}
						name="q"
						type="search"
					/>
					<RadioField
						name={"sort"}
						label={"Sort"}
						items={[
							{
								label: (
									<span title="Name ascending">
										<ArrowDownAZ
											className="inline-block mr-2"
											aria-label="Name ascending"
										/>
									</span>
								),
								value: "name",
							},
							{
								label: (
									<span title="Name descending">
										<ArrowDownZA
											className="inline-block mr-2"
											aria-label="Name descending"
										/>
									</span>
								),
								value: "-name",
							},
							{
								label: (
									<span title="Level ascending">
										<ArrowDown01
											className="inline-block mr-2"
											aria-label="Level ascending"
										/>
									</span>
								),
								value: "level",
							},
							{
								label: (
									<span title="Level descending">
										<ArrowDown10
											className="inline-block mr-2"
											aria-label="Level descending"
										/>
									</span>
								),
								value: "-level",
							},
						]}
					/>
				</Form>
			</FormContextProvider>
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
			<Link
				className="hover:bg-primary-500 block px-2 py-0.5 rounded"
				to={`/spells/${id}`}
			>
				<span className="font-bold">{name}</span> ({levelText})
			</Link>
		</li>
	);
}
