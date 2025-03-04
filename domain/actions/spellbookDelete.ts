import db from "@/utils/db";
import type MaybeError from "../MaybeError";
import { ErrorResult, SuccessResult } from "../MaybeError";

export default async function spellbookDelete(
	id: string,
): Promise<MaybeError<string>> {
	try {
		await db.spellbooks.delete(id);
	} catch (error) {
		console.error(error);
		return ErrorResult("There was an error deleting the data");
	}

	return SuccessResult();
}
