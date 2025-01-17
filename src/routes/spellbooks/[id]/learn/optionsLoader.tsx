import spellGetAll from "@/domain/actions/spellGetAll";
import { LoaderFunctionArgs } from "react-router";

export default async function optionsLoader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	// const spellbookId = url.searchParams.get("id");
	const spellIdsParam = url.searchParams.get("spellIds");

	const alreadyLearnedSpellIds: string[] = spellIdsParam
		? spellIdsParam.split(",")
		: [];

	// TODO filter by the tradition of the spellbook.
	const allSpells = await spellGetAll();

	const options = allSpells
		.filter((spell) => {
			return !alreadyLearnedSpellIds.includes(spell.id);
		})
		.map((spell) => {
			return {
				label: spell.name,
				text: spell.name,
				value: spell.id.toString(),
			};
		});

	options.unshift({
		label: "Select a spell",
		text: "",
		value: "",
	});

	return options;
}
