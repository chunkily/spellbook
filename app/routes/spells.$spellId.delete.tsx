import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import { Form, redirect } from "react-router";
import type { Route } from "./+types/spells.$spellId.delete";
import db from "@/utils/db";
import spellDelete from "@/domain/actions/spellDelete";
import { triggerSuccessToast } from "@/utils/toasts";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
	const spellId = params.spellId;

	const spell = await db.spells.get(spellId);

	if (!spell) {
		throw new Error("Spell not found");
	}

	return {
		spell,
	};
}

export async function clientAction({ params }: Route.ClientActionArgs) {
	const spellId = params.spellId;

	const req = await spellDelete(spellId);

	if (req.isSuccess) {
		triggerSuccessToast("Spell deleted successfully.");
		return redirect("/spells");
	} else {
		return {
			error: req.getErrorDescription(),
		};
	}
}

export default function SpellDeletePage({
	loaderData,
	actionData,
}: Route.ComponentProps) {
	const { spell } = loaderData;

	const error = actionData?.error;

	return (
		<div>
			<p className="mb-3">
				Are you sure you want to delete the spell <strong>{spell.name}</strong>?
				This action cannot be undone!
			</p>
			<Form method="post">
				{error && <p className="text-red-500">{error}</p>}
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
