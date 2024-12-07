import spellSearch, { SpellSearchResponse } from "@/domain/actions/spellSearch";
import { json, LoaderFunctionArgs } from "react-router-dom";

export default async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const q = url.searchParams.get("q") ?? undefined;
	const sort = url.searchParams.get("sort") ?? "name";

	const response: SpellSearchResponse = await spellSearch({
		search: q,
		sort,
	});

	return json({
		response,
		searchFields: {
			q,
			sort,
		},
	});
}
