import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import SelectField from "@/components/SelectField";
import TextAreaField from "@/components/TextAreaField";
import TextField from "@/components/TextField";
import { useSelectField } from "@/components/useSelectField";
import { useTextAreaField } from "@/components/useTextAreaField";
import { useTextField } from "@/components/useTextField";
import { Spell } from "@/domain/types/Spell";
import { Form, useActionData, useLoaderData } from "react-router-dom";

export default function SpellEditPage() {
	const { spell } = useLoaderData() as { spell: Spell };
	const actionData = useActionData() as
		| {
				error: string;
				errors?: Record<string, string[]>;
				fields: Record<string, string>;
		  }
		| undefined;

	return (
		<div>
			<Form method="post">
				<h1>Add New Spell</h1>
				<TextField
					label="Name"
					name="name"
					{...useTextField({
						serverValue: actionData?.fields.name ?? spell.name,
						serverErrors: actionData?.errors?.name,
						required: true,
					})}
				/>
				<SelectField
					label="Spell Level"
					name="level"
					{...useSelectField({
						serverValue: actionData?.fields.level ?? spell.level.toString(),
						serverErrors: actionData?.errors?.level,
					})}
				>
					<option value="1">Spell 1</option>
					<option value="2">Spell 2</option>
					<option value="3">Spell 3</option>
					<option value="4">Spell 4</option>
					<option value="5">Spell 5</option>
					<option value="6">Spell 6</option>
					<option value="7">Spell 7</option>
					<option value="8">Spell 8</option>
					<option value="9">Spell 9</option>
					<option value="10">Spell 10</option>
					<option value="0">Cantrip 1</option>
				</SelectField>
				<TextAreaField
					label="Description"
					name="description"
					maxLength={500}
					rows={8}
					{...useTextAreaField({
						serverValue: actionData?.fields.description ?? spell.description,
						serverErrors: actionData?.errors?.description,
						required: true,
					})}
				/>
				<div className="flex flex-row-reverse gap-2 max-w-lg">
					<Button type="submit">Edit</Button>
					<ButtonLink to={`/spells/${spell.id}`} variant="secondary">
						Cancel
					</ButtonLink>
				</div>
			</Form>
		</div>
	);
}
