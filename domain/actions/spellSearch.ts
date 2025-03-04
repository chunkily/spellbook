import { caseInsensitiveSearch } from "@/utils/caseInsensitiveSearch";
import db from "@/utils/db";
import type Spell from "../types/Spell";

interface SearchParams {
	search?: string;
	sort?: string;
}

export interface SpellSearchResponse {
	[key: string]: Spell[];
}

export default async function spellSearch({
	search,
	sort,
}: SearchParams): Promise<SpellSearchResponse> {
	let spells: Spell[];
	if (!search) {
		spells = await db.spells.toArray();
	} else {
		spells = await db.spells
			.filter((spell) => caseInsensitiveSearch(spell.name, search))
			.toArray();
	}

	spells = spells.sort((a, b) => a.name.localeCompare(b.name));

	if (!sort) {
		sort = "name";
	}

	if (sort === "name") {
		return groupByFirstLetter(spells);
	} else if (sort === "-name") {
		return groupByFirstLetter(spells.reverse());
	} else if (sort === "level") {
		return groupByLevel(spells.sort((a, b) => a.level - b.level));
	} else if (sort === "-level") {
		return groupByLevel(spells.sort((a, b) => b.level - a.level));
	} else {
		throw new Error("Invalid sort parameter");
	}
}

function groupByFirstLetter(spells: Spell[]): SpellSearchResponse {
	return spells.reduce((acc: { [key: string]: Spell[] }, spell) => {
		const key = spell.name[0].toUpperCase();
		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push(spell);
		return acc;
	}, {});
}

function groupByLevel(spells: Spell[]): SpellSearchResponse {
	return spells.reduce((acc: { [key: string]: Spell[] }, spell) => {
		const key = spellLevelDisplay(spell.level);
		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push(spell);
		return acc;
	}, {});
}

function spellLevelDisplay(level: number): string {
	if (level === 0) {
		return "Cantrip";
	}
	return `Level ${level}`;
}
