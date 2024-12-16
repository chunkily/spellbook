import traitGetAll from "@/domain/actions/traitGetAll";

export default async function loader() {
	const traits = await traitGetAll();

	return {
		traits,
	};
}
