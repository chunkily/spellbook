import { json, LoaderFunctionArgs } from "react-router-dom";
import spellGetById from "@/domain/actions/spellGetById";

export default async function loader({ params }: LoaderFunctionArgs) {
	const spellId = params.id;

	if (!spellId) {
		throw new Error("Missing id param");
	}

	const spell = await spellGetById(spellId);

	if (!spell) {
		throw new Error("Spell not found");
	}

	return json({
		spell,
	});
}
