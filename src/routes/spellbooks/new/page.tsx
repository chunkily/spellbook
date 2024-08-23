import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { Plus } from "lucide-react";
import { Form, useActionData } from "react-router-dom";

export default function NewSpellbook() {
	const actionData = useActionData() as
		| { error: string; errors?: Record<string, string[]> }
		| undefined;

	return (
		<div>
			<h1 className="text-xl">New Spellbook</h1>
			<Form method="post" className="max-w-lg">
				<TextField
					label="Name"
					type="text"
					name="name"
					errors={actionData?.errors?.name}
					placeholder="Enter the name of your character"
				/>
				{actionData?.error ? (
					<div className="text-red-500">{actionData.error}</div>
				) : null}
				<div className="flex justify-end">
					<Button type="submit">
						<Plus className="h-4 w-4 mr-2" />
						Create
					</Button>
				</div>
			</Form>
		</div>
	);
}
