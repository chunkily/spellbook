import { UseComboboxReturnValue } from "downshift";
import { SearchableOption } from "./Option";
import React from "react";
import Button from "./Button";

interface SearchableSelectFieldProps
	extends UseComboboxReturnValue<SearchableOption>,
		Omit<
			React.SelectHTMLAttributes<HTMLSelectElement>,
			"value" | "defaultValue"
		> {
	label: React.ReactNode;
	name: string;
	errors?: string[];
	items: SearchableOption[];
}

export default function SearchableSelectField({
	label,
	name,
	selectedItem,
	items,
	isOpen,
	highlightedIndex,
	getLabelProps,
	getToggleButtonProps,
	getMenuProps,
	getItemProps,
	getInputProps,
}: SearchableSelectFieldProps) {
	return (
		<div className="mb-3 max-w-lg text-sm">
			<div className="flex flex-col gap-1">
				<label className="w-fit" {...getLabelProps()}>
					{label}
				</label>
				<div className="flex shadow-sm bg-white gap-0.5 rounded-lg">
					<input
						placeholder="Start typing to search..."
						className="w-full p-1.5 rounded-l-lg"
						{...getInputProps()}
					/>
					<Button
						aria-label="toggle menu"
						className="rounded-l-none"
						type="button"
						{...getToggleButtonProps()}
					>
						{isOpen ? <>&#8593;</> : <>&#8595;</>}
					</Button>
				</div>
			</div>
			<ul
				className={`absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
					!(isOpen && items.length) && "hidden"
				}`}
				{...getMenuProps()}
			>
				{isOpen &&
					items.map((item, index) => (
						<li
							className={cx(
								highlightedIndex === index && "bg-blue-300",
								selectedItem === item && "font-bold",
								"py-2 px-3 shadow-sm flex flex-col",
							)}
							key={item.value}
							{...getItemProps({ item, index })}
						>
							{item.label}
						</li>
					))}
			</ul>
			<input type="hidden" name={name} value={selectedItem?.value} />
		</div>
	);
}

function cx(...classes: (string | boolean | undefined)[]) {
	return classes.filter(Boolean).join(" ");
}
