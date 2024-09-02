import spellSearch from "@/domain/actions/spellSearch";
import Spell from "@/domain/types/Spell";
import { json, LoaderFunctionArgs } from "react-router-dom";

export default async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const q = url.searchParams.get("q") ?? undefined;

	const spells: Spell[] = await spellSearch({
		search: q,
	});

	return json({
		spells,
		searchFields: {
			q,
		},
	});
}
