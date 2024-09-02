import Spell from "@/domain/types/Spell";

export default function SpellDisplay({ spell }: { spell: Spell }) {
	const msv = [];
	if (spell.castCost.material) {
		msv.push("Material");
	}
	if (spell.castCost.somatic) {
		msv.push("Somatic");
	}
	if (spell.castCost.verbal) {
		msv.push("Verbal");
	}

	return (
		<div className="mb-3">
			<div className="text-xl flex mb-1">
				<span>{spell.name}</span>
				<span className="ml-auto">{spellLevelToString(spell.level)}</span>
			</div>
			<hr className="border-black mb-1" />
			<div className="flex flex-wrap">
				{spell.traits.map((trait) => (
					<span key={trait} className="mx-1 px-2 bg-primary-400 rounded">
						{trait}
					</span>
				))}
			</div>
			<p className="mb-1">
				<b>Traditions:</b> {spell.traditions.join(", ")}
			</p>
			<p className="mb-1">
				<b>Cast: </b>
				<span className="mr-1">{castActionDisplay(spell.castAction)}</span>
				<span className="mr-1">
					{msv.length > 0 ? ` (${msv.join(", ")})` : " "}
				</span>
				{spell.castCost.other ? (
					<span className="mr-1">{spell.castCost.other}</span>
				) : null}
				{spell.castTrigger ? (
					<span className="mr-1">
						<b>Trigger: </b>
						{spell.castTrigger}
					</span>
				) : null}
			</p>
			<p className="mb-1">
				{spell.range ? (
					<span className="mr-2">
						<b>Range:</b> {spell.range}
					</span>
				) : null}
				{spell.area ? (
					<span className="mr-2">
						<b>Area:</b> {spell.area}
					</span>
				) : null}
				{spell.targets ? (
					<span>
						<b>Targets:</b> {spell.targets}
					</span>
				) : null}
			</p>
			<p className="mb-1">
				{spell.savingThrow ? (
					<span className="mr-2">
						<b>Saving Throw:</b> {spell.savingThrow}
					</span>
				) : null}
				{spell.duration ? (
					<span>
						<b>Duration:</b> {spell.duration}
					</span>
				) : null}
			</p>
			<hr className="border-black mb-1" />
			<p className="max-w-prose whitespace-pre-wrap mb-1">
				{spell.description}
			</p>
			<hr className="border-black mb-1" />
			{spell.heightenedEffects.length > 0
				? spell.heightenedEffects.map((h) => (
						<p key={`${h.add}${h.level}`} className="max-w-prose">
							<b>
								Heightened ({heightenedEffectLevelDisplay(h.add, h.level)}):{" "}
							</b>
							{h.effect}
						</p>
					))
				: null}
		</div>
	);
}

function spellLevelToString(level: number): string {
	if (level === 0) {
		return "Cantrip 1";
	}
	return `Spell ${level}`;
}

function castActionDisplay(castAction: string) {
	switch (castAction) {
		case "R":
			return <span title="Reaction">⟳</span>;
		case "1":
			return <span title="1 action">◆</span>;
		case "2":
			return <span title="2 actions">◆◆</span>;
		case "3":
			return <span title="3 actions">◆◆◆</span>;
		case "13":
			return <span title="1 to 3 actions">◆ to ◆◆◆</span>;
		case "12":
			return <span title="1 to 2 actions">◆ to ◆◆</span>;
		case "1M":
			return "1 minute";
		case "10M":
			return "10 minutes";
		case "1H":
			return "1 hour";
		default:
			return castAction;
	}
}

function heightenedEffectLevelDisplay(add: number, level: number): string {
	if (add > 0) {
		return `+${add}`;
	}
	switch (level) {
		case 1:
			return "1st";
		case 2:
			return "2nd";
		case 3:
			return "3rd";
		default:
			return `${level}th`;
	}
}
