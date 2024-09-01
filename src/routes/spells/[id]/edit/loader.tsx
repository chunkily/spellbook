import spellGetById from "@/domain/actions/spellGetById";
import traitGetAll from "@/domain/actions/traitGetAll";
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

	const traits = await traitGetAll();

	return {
		spell,
		traits,
	};
}
