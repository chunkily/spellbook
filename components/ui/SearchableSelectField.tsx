import { useCombobox } from "downshift";
import { type SearchableOption } from "./Option";
import React, { useId, useState } from "react";
import useFormField from "../form/useFormField";
import ErrorList from "./ErrorList";
import { ChevronDown } from "lucide-react";
import { caseInsensitiveSearch } from "../../utils/caseInsensitiveSearch";
import { twMerge } from "tailwind-merge";

interface SearchableSelectFieldProps {
	id?: string;
	label: React.ReactNode;
	name: string;
	items: SearchableOption[];
	onSelectedItemChange?: (value: string) => void;
	className?: string;
}

const DEFAULT_ITEM: SearchableOption = { value: "", text: "", label: "" };

export default function SearchableSelectField({
	id,
	label,
	name,
	items,
	onSelectedItemChange: propsOnSelectedItemChange,
	className: propClassName,
}: SearchableSelectFieldProps) {
	const fallbackId = useId();
	id = id ?? fallbackId;

	const field = useFormField(name);

	const [inputValue, setInputValue] = useState("");

	const selectedItem: SearchableOption =
		items.find((item) => item.value === field.value) ??
		items[0] ??
		DEFAULT_ITEM; // If no items are provided, we need to set to a non-undefined value

	const filteredItems = items.filter((item) =>
		inputValue ? caseInsensitiveSearch(item.text, inputValue) : true,
	);

	const errors = field.errors;

	const hasErrors = errors && errors.length > 0;

	let baseButtonClassName =
		"flex h-10 shadow-xs bg-white gap-0.5 rounded-lg text-left p-2.5 w-full border";

	if (hasErrors) {
		baseButtonClassName += " border-red-500";
	}

	const baseClassName = "mb-3 w-full max-w-lg text-sm";
	const className = twMerge(baseClassName, propClassName);

	const {
		getInputProps,
		getItemProps,
		getLabelProps,
		getMenuProps,
		getToggleButtonProps,
		highlightedIndex,
		isOpen,
	} = useCombobox<SearchableOption>({
		id,
		items: filteredItems,
		itemToString: (item) => (item ? item.text : ""),
		inputValue,
		selectedItem,
		onInputValueChange: ({ inputValue }) => {
			setInputValue(inputValue);
		},
		onSelectedItemChange: ({ selectedItem }) => {
			field.onValueChange(selectedItem?.value);
			field.setErrors([]);

			if (propsOnSelectedItemChange) {
				propsOnSelectedItemChange(selectedItem?.value);
			}
		},
		stateReducer: (_state, actionAndChanges) => {
			const { changes, type } = actionAndChanges;

			switch (type) {
				case useCombobox.stateChangeTypes.ToggleButtonClick:
					// Clear input value when menu is opening from toggle button
					return {
						...changes,
						inputValue: "",
					};
				case useCombobox.stateChangeTypes.InputKeyDownEnter:
					// Grab the first item in the list if the user presses enter
					if (filteredItems.length > 0) {
						return {
							...changes,
							selectedItem: filteredItems[0],
						};
					}
					return changes;
				default:
					return changes;
			}
		},
	});

	return (
		<div className={className}>
			<div>
				<label className="w-fit" {...getLabelProps()}>
					{label}
				</label>
				<div className="relative">
					<button
						type="button"
						className={baseButtonClassName}
						{...getToggleButtonProps()}
						title={selectedItem?.text}
						data-testid={`toggle-button-${name}`}
					>
						<span className="truncate pr-5">{selectedItem?.label}</span>
						<ChevronDown className="absolute right-2.5 top-2.5 size-5" />
					</button>
				</div>
			</div>

			<div
				className={cx(
					"absolute bg-white w-full max-w-lg rounded-lg shadow-lg z-10 min-h-20",
					isOpen && "block",
					!isOpen && "hidden",
				)}
			>
				<input
					{...getInputProps()}
					placeholder="Start typing to search"
					className="w-full rounded-lg p-2.5 mb-2"
				/>
				<ul {...getMenuProps()} className="overflow-y-auto max-h-60">
					{filteredItems.map((item, index) => (
						<li
							key={`${item.value}`}
							title={item.text}
							className={cx(
								"p-2 cursor-pointer truncate",
								selectedItem?.value === item.value && "bg-yellow-100",
								highlightedIndex === index && "bg-gray-200",
							)}
							{...getItemProps({ item, index })}
						>
							{item.label}
						</li>
					))}
				</ul>
			</div>

			<input type="hidden" name={name} value={selectedItem?.value} />
			<ErrorList id={`${name}-error`} errors={errors} />
		</div>
	);
}

function cx(...classes: (string | boolean | undefined)[]) {
	return classes.filter(Boolean).join(" ");
}
