import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import SearchableSelectField from "@/components/ui/SearchableSelectField";
import useSearchableSelectField from "@/components/ui/useSearchableSelectField";
import { Form, useActionData, useLoaderData } from "react-router-dom";

export default function SpellbookLearnPage() {
	const { id, options } = useLoaderData() as {
		id: number;
		options: { label: string; text: string; value: string }[];
	};
	const actionData = useActionData() as
		| {
				error: string;
		  }
		| undefined;

	return (
		<div>
			<Form className="max-w-lg" method="post">
				<SearchableSelectField
					label="Spell"
					name="spell"
					{...useSearchableSelectField({
						items: options,
						serverValue: "",
					})}
				/>
				{actionData?.error && (
					<p className="text-red-500 text-sm">{actionData.error}</p>
				)}
				<div className="flex justify-between gap-2">
					<Button variant="success">Add Spell to Spellbook</Button>
					<ButtonLink to={`/spellbooks/${id}`} variant="warning">
						Cancel
					</ButtonLink>
				</div>
			</Form>
		</div>
	);
}
