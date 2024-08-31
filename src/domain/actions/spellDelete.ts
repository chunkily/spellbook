import { deleteFromStore, openDb } from "@/utils/indexedDb";
import MaybeError, { ErrorResult, SuccessResult } from "../MaybeError";

export default async function spellbookDelete(
	id: string,
): Promise<MaybeError<string>> {
	const db = await openDb();

	try {
		await deleteFromStore(db, "spells", id);
	} catch (error) {
		console.error(error);
		return ErrorResult("There was an error deleting the data");
	}

	return SuccessResult();
}
