import type Spell from "@/domain/types/Spell";
import type Spellbook from "@/domain/types/Spellbook";
import slugifyName from "@/utils/slugifyName";
import Dexie, { type EntityTable } from "dexie";

const db = new Dexie("app") as Dexie & {
	spells: EntityTable<Spell, "id">;
	spellbooks: EntityTable<Spellbook, "id">;
	traits: EntityTable<{ name: string }, "name">;
};

db.version(2).stores({
	spells: "++id, name",
	spellbooks: "++id, name",
	traits: "++id, name",
});

// In order to change the primary key of a table, we need to use an intermediate version
// See https://github.com/dexie/Dexie.js/issues/781#issuecomment-443237897
db.version(3)
	.stores({
		spells: null,
		spellsTemp: "id",
		spellbooks: null,
		spellbooksTemp: "id",
		traits: null,
		traitsTemp: "id",
	})
	.upgrade(async (tx) => {
		const spells = await tx.table("spells").toArray();
		await tx.table("spellsTemp").bulkAdd(spells);

		const spellbooks = await tx.table("spellbooks").toArray();
		await tx.table("spellbooksTemp").bulkAdd(spellbooks);
	});

db.version(4)
	.stores({
		spells: "id", // Primary key and indexed props
		spellsTemp: null,
		spellbooks: "id",
		spellbooksTemp: null,
		traits: "name",
		traitsTemp: null,
	})
	.upgrade(async (tx) => {
		const oldSpells = await tx.table("spellsTemp").toArray();
		const spells = oldSpells.map((spell) => {
			spell.id = slugifyName(spell.name);
			return spell;
		});
		await tx.table("spells").bulkAdd(spells);

		const oldSpellbooks = await tx.table("spellbooksTemp").toArray();
		const spellbooks = oldSpellbooks.map((spellbook) => {
			spellbook.id = slugifyName(spellbook.name);
			spellbook.learnedSpells = spellbook.learnedSpells.map(
				(spell: { id: string; name: string }) => {
					spell.id = slugifyName(spell.name);
					return spell;
				},
			);
			return spellbook;
		});
		await tx.table("spellbooks").bulkAdd(spellbooks);
	});

export default db;
