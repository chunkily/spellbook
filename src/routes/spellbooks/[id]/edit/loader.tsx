import spellbookGetById from "@/domain/actions/spellbookGetById";
import parseId from "@/utils/parseId";
import { LoaderFunctionArgs } from "react-router";
import { FormFields } from "./action";

export default async function loader({ params }: LoaderFunctionArgs) {
	const spellbookId = parseId(params.id);

	const spellbook = await spellbookGetById(spellbookId);

	if (!spellbook) {
		throw new Error("Spellbook not found");
	}

	const result: FormFields = {
		id: spellbook.id,
		name: spellbook.name,
		kind: spellbook.kind,
		spellslots: {
			0: spellbook.spellSlots[0].length.toString(),
			1: spellbook.spellSlots[1].length.toString(),
			2: spellbook.spellSlots[2].length.toString(),
			3: spellbook.spellSlots[3].length.toString(),
			4: spellbook.spellSlots[4].length.toString(),
			5: spellbook.spellSlots[5].length.toString(),
			6: spellbook.spellSlots[6].length.toString(),
			7: spellbook.spellSlots[7].length.toString(),
			8: spellbook.spellSlots[8].length.toString(),
			9: spellbook.spellSlots[9].length.toString(),
			10: spellbook.spellSlots[10].length.toString(),
		},
	};

	return result;
}
