import spellSearch, { SpellSearchResponse } from "@/domain/actions/spellSearch";
import { LoaderFunctionArgs } from "react-router";

export default async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const q = url.searchParams.get("q") ?? undefined;
	const sort = url.searchParams.get("sort") ?? "name";

	const response: SpellSearchResponse = await spellSearch({
		search: q,
		sort,
	});

	return {
		response,
		searchFields: {
			q,
			sort,
		},
	};
}
