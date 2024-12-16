import { LoaderFunctionArgs } from "react-router";
import spellGetById from "@/domain/actions/spellGetById";
import parseId from "@/utils/parseId";

export default async function loader({ params }: LoaderFunctionArgs) {
	const spellId = parseId(params.id);

	const spell = await spellGetById(spellId);

	if (!spell) {
		throw new Error("Spell not found");
	}

	return {
		spell,
	};
}
