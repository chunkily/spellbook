import db from "@/utils/db";

export default async function traitGetAll(): Promise<string[]> {
	const traits = await db.traits.toArray();

	return traits.map((trait) => trait.name.toUpperCase());
}
