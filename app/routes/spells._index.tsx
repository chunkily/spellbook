import FormContextProvider from "@/components/form/FormContextProvider";
import useFormContext from "@/components/form/useFormContext";
import ButtonLink from "@/components/ui/ButtonLink";
import { SrOnlyLabel } from "@/components/ui/Label";
import RadioField from "@/components/ui/RadioField";
import TextField from "@/components/ui/TextField";
import type Spell from "@/domain/types/Spell";
import {
	ArrowDown01,
	ArrowDown10,
	ArrowDownAZ,
	ArrowDownZA,
	Plus,
} from "lucide-react";
import { Form, Link, useSubmit } from "react-router";

import spellSearch from "@/domain/actions/spellSearch";
import type { Route } from "./+types/spells._index";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
	const url = new URL(request.url);
	const q = url.searchParams.get("q") ?? undefined;
	const sort = url.searchParams.get("sort") ?? "name";

	const data = await spellSearch({
		search: q,
		sort,
	});

	return {
		data,
		searchFields: {
			q,
			sort,
		},
	};
}

export default function SpellsIndexPage({ loaderData }: Route.ComponentProps) {
	const { data, searchFields } = loaderData;
	const submit = useSubmit();

	const formContext = useFormContext({
		serverValues: searchFields,
	});

	const keys = Object.keys(data);

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
					<SpellList key={key} group={key} spells={data[key]} />
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
				className="hover:bg-primary-500 block px-2 py-0.5 rounded-sm"
				to={`/spells/${id}`}
			>
				<span className="font-bold">{name}</span> ({levelText})
			</Link>
		</li>
	);
}
