import exportData from "@/domain/actions/exportData";
import { LoaderFunctionArgs } from "react-router-dom";

export default async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);

	let includeSpells = url.searchParams.get("includeSpells") === "true";
	let includeSpellbooks = url.searchParams.get("includeSpellbooks") === "true";
	let includeTraits = url.searchParams.get("includeTraits") === "true";

	// If all are not selected, set all to true
	if (!includeSpells && !includeSpellbooks && !includeTraits) {
		includeSpells = true;
		includeSpellbooks = true;
		includeTraits = true;
	}

	const data = await exportData({
		includeSpells,
		includeSpellbooks,
		includeTraits,
	});

	return {
		data: data,
		fields: {
			includeSpells,
			includeSpellbooks,
			includeTraits,
		},
	};
}
