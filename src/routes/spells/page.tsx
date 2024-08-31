import ButtonLink from "@/components/ButtonLink";
import TextField from "@/components/TextField";
import useTextField from "@/components/useTextField";
import { Spell } from "@/domain/types/Spell";
import { Plus } from "lucide-react";
import { Form, Link, useLoaderData, useSubmit } from "react-router-dom";

export default function SpellsPage() {
	const { spells, searchFields } = useLoaderData() as {
		spells: Spell[];
		searchFields: { q: string | undefined };
	};
	const submit = useSubmit();

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
			</Form>
			<div className="fixed bottom-5 right-5">
				<ButtonLink to="/spells/new">
					<Plus className="h-4 w-4 mr-2" />
					Add New Spell
				</ButtonLink>
			</div>
			<ul>
				{spells.map((spell) => (
					<li key={spell.id}>
						<Link to={`/spells/${spell.id}`}>{spell.name}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
