import { Form, useActionData, useLoaderData } from "react-router-dom";

export default function SpellbookDeletePage() {
	const { spellbook } = useLoaderData() as {
		spellbook: { id: string; name: string };
	};
	const actionData = useActionData() as { error: Error } | undefined;

	const error = actionData?.error;

	return (
		<div>
			<p>
				Are you sure you want to delete the spellbook{" "}
				<strong>{spellbook.name}</strong>? This action cannot be undone.
			</p>
			<Form method="post">
				{error && <p className="text-red-500">{error.message}</p>}
				<button type="submit">Delete</button>
			</Form>
		</div>
	);
}
