import spellGetById from "@/domain/actions/spellGetById";
import parseId from "@/utils/parseId";
import { LoaderFunctionArgs } from "react-router-dom";

export default async function loader({ params }: LoaderFunctionArgs) {
	const id = parseId(params.id);

	const spell = await spellGetById(id);

	if (!spell) {
		throw new Error("Spell not found");
	}

	return {
		spell,
	};
}
