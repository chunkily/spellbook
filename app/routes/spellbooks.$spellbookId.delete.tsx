import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import { data, Form, redirect } from "react-router";
import type { Route } from "./+types/spellbooks.$spellbookId.delete";
import db from "@/utils/db";
import spellbookDelete from "@/domain/actions/spellbookDelete";
import { triggerSuccessToast } from "@/utils/toasts";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
	const spellbookId = params.spellbookId;

	const spellbook = await db.spellbooks.get(spellbookId);

	if (!spellbook) {
		throw new Error("Spellbook not found");
	}

	return {
		spellbook,
	};
}

export async function clientAction({ params }: Route.ClientActionArgs) {
	const spellbookId = params.spellbookId;

	const req = await spellbookDelete(spellbookId);

	if (req.isSuccess) {
		triggerSuccessToast("Spellbook deleted successfully.");
		return redirect("/spellbooks");
	} else {
		return data(
			{
				error: req.getErrorDescription(),
			},
			{
				status: 500,
			},
		);
	}
}

export default function SpellbookDeletePage({
	loaderData,
	actionData,
}: Route.ComponentProps) {
	const { spellbook } = loaderData;

	const error = actionData?.error;

	return (
		<div>
			<p className="mb-3">
				Are you sure you want to cast the spellbook of{" "}
				<strong>{spellbook.name}</strong> into the void? This action cannot be
				undone!
			</p>
			<Form method="post">
				{error && <p className="text-red-500">{error}</p>}
				<div className="flex gap-2">
					<Button type="submit" variant="danger">
						Yes, I'm sure
					</Button>
					<ButtonLink to={`/spellbooks/${spellbook.id}`} variant="secondary">
						Wait I've changed my mind
					</ButtonLink>
				</div>
			</Form>
		</div>
	);
}
