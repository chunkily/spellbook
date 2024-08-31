import Button from "@/components/Button";
import TextAreaField from "@/components/TextAreaField";
import TextField from "@/components/TextField";
import { useTextAreaField } from "@/components/useTextAreaField";
import { useTextField } from "@/components/useTextField";
import { Form } from "react-router-dom";

export default function Page() {
	return (
		<div>
			<Form method="post">
				<h1>Add New Spell</h1>
				<TextField
					label="Name"
					name="name"
					{...useTextField({ serverValue: "" })}
				/>
				<TextAreaField
					label="Description"
					name="description"
					maxLength={500}
					rows={8}
					{...useTextAreaField({ serverValue: "" })}
				/>
				<Button type="submit">Add Spell To Global List</Button>
			</Form>
		</div>
	);
}
