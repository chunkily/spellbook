import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import { Form, useActionData, useLoaderData } from "react-router-dom";

export default function SpellbookDeletePage() {
	const { spell } = useLoaderData() as {
		spell: { id: string; name: string };
	};
	const actionData = useActionData() as { error: Error } | undefined;

	const error = actionData?.error;

	return (
		<div>
			<p className="mb-3">
				Are you sure you want to delete the spell <strong>{spell.name}</strong>?
				This action cannot be undone!
			</p>
			<Form method="post">
				{error && <p className="text-red-500">{error.message}</p>}
				<div className="flex gap-2">
					<Button type="submit" variant="danger">
						Yes, I'm sure
					</Button>
					<ButtonLink to={`/spells/${spell.id}`} variant="secondary">
						Wait I've changed my mind
					</ButtonLink>
				</div>
			</Form>
		</div>
	);
}
