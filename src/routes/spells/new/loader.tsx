import traitGetAll from "@/domain/actions/traitGetAll";
import { json } from "react-router-dom";

export default async function loader() {
	const traits = await traitGetAll();

	return json({
		traits,
	});
}
