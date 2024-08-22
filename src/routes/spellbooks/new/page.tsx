import { Form } from "react-router-dom";

export default function NewSpellbook() {
	return (
		<div>
			<h1>New Spellbook</h1>
			<Form method="post">
				<input type="text" name="name" />
				<button type="submit">Create</button>
			</Form>
		</div>
	);
}
