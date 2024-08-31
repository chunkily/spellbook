import spellGetById from "@/domain/actions/spellGetById";
import { LoaderFunctionArgs } from "react-router-dom";

export default async function loader({ params }: LoaderFunctionArgs) {
	const id = params.id;

	if (!id) {
		throw new Error("Missing id param");
	}

	const spell = await spellGetById(id);

	if (!spell) {
		throw new Error("Spell not found");
	}

	return {
		spell,
	};
}
