import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import { Form, useActionData, useLoaderData } from "react-router";
import loader from "./loader";
import { Edit, Eye } from "lucide-react";
import { useState } from "react";
import Spell from "@/domain/types/Spell";
import SpellDisplay from "@/components/SpellDisplay";
import useFormContext from "@/components/form/useFormContext";
import FormContextProvider from "@/components/form/FormContextProvider";
import FormState from "@/components/form/FormState";
import FormAction from "@/components/form/FormAction";
import SearchableSelectField from "@/components/ui/SearchableSelectField";
import useFormField from "@/components/form/useFormField";
import { SearchableOption } from "@/components/ui/Option";

function reducer(state: FormState, action: FormAction): FormState {
	let newState: FormState;
	switch (action.type) {
		case "SET_FIELD":
			newState = {
				...state,
				fields: {
					...state.fields,
					[action.fieldName]: action.value,
				},
			};

			// Unset any other slots with the same spell
			Object.entries(newState.fields).forEach(([fieldName, value]) => {
				if (fieldName !== action.fieldName && value === action.value) {
					newState.fields[fieldName] = "";
				}
			});

			break;
		case "SET_ERROR":
			newState = {
				...state,
				errors: {
					...state.errors,
					[action.fieldName]: action.errors,
				},
			};
			break;
		case "RESET":
			newState = {
				fields: action.fields,
				errors: action.errors,
			};
			break;
		default:
			throw new Error("Invalid action type");
	}

	return newState;
}

export default function SpellbookLearnPage() {
	const { id, learnedSpells, fields, slotCounts } =
		useLoaderData<typeof loader>();
	const actionData = useActionData<{
		error: string;
	}>();
	const formContext = useFormContext({
		serverValues: fields,
		stateReducer: reducer,
	});

	const [displayedSpell, setDisplayedSpell] = useState<Spell | null>(null);

	const handlePreview = (spellId?: string) => {
		if (spellId) {
			const spell = learnedSpells.find((s) => s.id === spellId);
			if (spell) {
				setDisplayedSpell(spell);
			}
		} else {
			setDisplayedSpell(null);
		}
	};

	return (
		<FormContextProvider formContext={formContext}>
			<div className="flex">
				<div className="w-full md:w-1/2">
					<Form method="post">
						{slotCounts.map((count, level) => (
							<SpellSlots
								key={level}
								slotsCount={count}
								level={level}
								learnedSpells={learnedSpells}
								onPreview={handlePreview}
							/>
						))}
						{actionData?.error && (
							<p className="text-red-500 text-sm">{actionData.error}</p>
						)}
						<div className="flex justify-between gap-2">
							<Button variant="success">Save</Button>
							<ButtonLink to={`/spellbooks/${id}`} variant="warning">
								Cancel
							</ButtonLink>
						</div>
					</Form>
				</div>

				<div className="w-full md:w-1/2">
					<div>{displayedSpell && <SpellDisplay spell={displayedSpell} />}</div>
				</div>
			</div>
			<div className="fixed bottom-5 right-5">
				<ButtonLink to={`/spellbooks/${id}/learn`} variant="primary">
					<Edit className="h-4 w-4 mr-2" />
					Modify Learned Spells
				</ButtonLink>
			</div>
		</FormContextProvider>
	);
}

function SpellSlots({
	slotsCount,
	level,
	learnedSpells,
	onPreview,
}: {
	slotsCount: number;
	level: number;
	learnedSpells: Spell[];
	onPreview: (spellId: string) => void;
}) {
	if (slotsCount === 0) {
		return null;
	}

	return (
		<div>
			<h3>{level > 0 ? `Level ${level}` : "Cantrips"}</h3>
			<ul>
				{Array.from({ length: slotsCount }).map((_, index) => (
					<li key={index}>
						<SpellSlot
							level={level}
							index={index}
							learnedSpells={learnedSpells}
							onPreview={onPreview}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}

function SpellSlot({
	level,
	index,
	learnedSpells,
	onPreview,
}: {
	level: number;
	index: number;
	learnedSpells: Spell[];
	onPreview: (spellId: string) => void;
}) {
	const options: SearchableOption[] = learnedSpells
		.filter((spell) =>
			level === 0 ? spell.level === 0 : spell.level > 0 && spell.level <= level,
		)
		.map((spell) => ({
			value: spell.id,
			label: spellLabel(spell),
			text: spellLabel(spell),
		}));

	options.unshift({
		value: "",
		label: <span className="text-gray-400">Empty</span>,
		text: "",
	});

	const fieldName = `${level}-${index + 1}`;

	const field = useFormField(fieldName);

	return (
		<div className="flex gap-2">
			<SearchableSelectField
				id={fieldName}
				label={
					<label className="sr-only" htmlFor={fieldName}>
						Spell slot {level} {index + 1}
					</label>
				}
				name={fieldName}
				items={options}
			/>
			<Button
				type="button"
				className="h-10"
				title="View spell details"
				onClick={() => onPreview(field.value)}
			>
				<Eye className="h-4 w-4" />
			</Button>
		</div>
	);
}

function spellLabel(spell: Spell): string {
	if (spell.level === 0) {
		return spell.name;
	}
	return `${spell.name} (Level ${spell.level})`;
}
