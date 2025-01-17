import { LoaderFunctionArgs } from "react-router";
import spellbookGetById from "@/domain/actions/spellbookGetById";
import parseId from "@/utils/parseId";
import spellsGetByIds from "@/domain/actions/spellsGetByIds";

export default async function loader({ params }: LoaderFunctionArgs) {
	const spellbookId = parseId(params.id);

	const spellbook = await spellbookGetById(spellbookId);

	if (!spellbook) {
		throw new Error("Spellbook not found");
	}

	const learnedSpells = await spellsGetByIds(spellbook.learnedSpellIds);

	const slots = spellbook.spellSlots;

	const slotCounts = slots.map((level) => level.length);

	const fields: Record<string, string> = {};
	slots.forEach((levelSlots) => {
		levelSlots.forEach((slot) => {
			fields[slot.id] = slot.preparedSpellId ?? "";
		});
	});

	return {
		id: spellbook.id,
		learnedSpells,
		fields,
		slotCounts,
	};
}
