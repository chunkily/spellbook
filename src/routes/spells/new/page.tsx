import { useActionData, useLoaderData } from "react-router";
import SpellForm, { SpellFormFields } from "@/components/SpellForm";
import loader from "./loader";

export default function Page() {
	const { traits } = useLoaderData<typeof loader>();
	const actionData = useActionData<{
		fields: SpellFormFields;
		errors: Record<string, string[]>;
	}>();

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
