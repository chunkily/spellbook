import FormContextProvider from "@/components/form/FormContextProvider";
import useFormContext from "@/components/form/useFormContext";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import Checkbox from "@/components/ui/Checkbox";
import TextArea from "@/components/ui/TextArea";
import { triggerSuccessToast } from "@/utils/toasts";
import { Clipboard } from "lucide-react";
import { Form, useLoaderData, useSubmit } from "react-router";

export default function ExportPage() {
	const { data, fields } = useLoaderData() as {
		data: unknown;
		fields: {
			includeSpells: boolean;
			includeSpellbooks: boolean;
			includeTraits: boolean;
		};
	};

	const formContext = useFormContext({
		serverValues: fields,
	});

	const submit = useSubmit();

	const textData = JSON.stringify(data, null, 2);

	return (
		<div>
			<h1 className="text-lg mb-3">Export Data</h1>
			<FormContextProvider formContext={formContext}>
				<Form
					method="get"
					onChange={(e) => {
						submit(e.currentTarget, {
							replace: true,
						});
					}}
				>
					<p>Select items to export.</p>

					<div className="flex mb-2 flex-col">
						<Checkbox name="includeSpells" label="Spells" />
						<Checkbox name="includeSpellbooks" label="Spellbooks" />
						<Checkbox name="includeTraits" label="Traits" />
					</div>
				</Form>
			</FormContextProvider>

			<div className="mb-2 max-w-lg">
				<label className="sr-only" htmlFor="data">
					Data
				</label>
				<TextArea
					id="data"
					readOnly
					className="my-2"
					rows={10}
					value={textData}
				></TextArea>
				<Button onClick={() => copyToClipboard(textData)}>
					<Clipboard className="w-4 h-4 mr-2" />
					Copy to clipboard
				</Button>
			</div>

			<ButtonLink to="/data" variant="secondary">
				Back
			</ButtonLink>
		</div>
	);
}

function copyToClipboard(text: string) {
	navigator.clipboard.writeText(text).then(() => {
		triggerSuccessToast("Copied to clipboard");
	});
}
