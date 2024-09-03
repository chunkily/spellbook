import { useActionData, useLoaderData } from "react-router-dom";
import SpellForm, { SpellFormFields } from "@/components/SpellForm";

export default function Page() {
	const { traits } = useLoaderData() as { traits: string[] };
	const actionData = useActionData() as
		| {
				error: string;
				errors?: Record<string, string[]>;
				fields: SpellFormFields;
		  }
		| undefined;

	return (
		<div>
			<h1 className="text-xl">Add New Spell</h1>
			<SpellForm
				fields={actionData?.fields}
				errors={actionData?.errors}
				traits={traits}
				mode={"create"}
			/>
		</div>
	);
}
