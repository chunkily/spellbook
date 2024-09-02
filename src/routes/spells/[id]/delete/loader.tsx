import { json, LoaderFunctionArgs } from "react-router-dom";
import spellGetById from "@/domain/actions/spellGetById";
import parseId from "@/utils/parseId";

export default async function loader({ params }: LoaderFunctionArgs) {
	const spellId = parseId(params.id);

	const spell = await spellGetById(spellId);

	if (!spell) {
		throw new Error("Spell not found");
	}

	return json({
		spell,
	});
}
