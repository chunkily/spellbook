import spellbookGetAll from "../../domain/actions/spellbookGetAll";

export default async function loader() {
	const spellbooks = await spellbookGetAll();

	return {
		spellbooks,
	};
}
