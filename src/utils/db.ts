import Spell from "@/domain/types/Spell";
import Spellbook from "@/domain/types/Spellbook";
import Dexie, { EntityTable } from "dexie";

const db = new Dexie("app") as Dexie & {
	spells: EntityTable<Spell, "id">;
	spellbooks: EntityTable<Spellbook, "id">;
	traits: EntityTable<{ id: number; name: string }, "id">;
};

db.version(2).stores({
	spells: "++id, name", // Primary key and indexed props
	spellbooks: "++id, name",
	traits: "++id, name",
});

export default db;
