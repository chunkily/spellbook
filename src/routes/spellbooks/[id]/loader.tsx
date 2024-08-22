import { json, LoaderFunctionArgs } from "react-router-dom";

export default function loader({ params }: LoaderFunctionArgs) {
	const spellbookId = params.id;

	if (!spellbookId) {
		throw new Error("Missing id param");
	}

	const spellbook = {
		id: params.id,
		name: `Spellbook ${params.id}`,
	};

	return json({
		spellbook,
	});
}
