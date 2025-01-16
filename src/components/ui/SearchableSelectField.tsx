import { useCombobox } from "downshift";
import { SearchableOption } from "./Option";
import React, { useMemo, useState } from "react";
import useFormField from "../form/useFormField";
import ErrorList from "./ErrorList";
import { ChevronDown } from "lucide-react";

interface SearchableSelectFieldProps {
	label: React.ReactNode;
	name: string;
	items: SearchableOption[];
	onSelectedItemChange?: (value: string) => void;
}

export default function SearchableSelectField({
	label,
	name,
	items,
	onSelectedItemChange: propsOnSelectedItemChange,
}: SearchableSelectFieldProps) {
	const field = useFormField(name);

	if (items.length === 0) {
		items = [{ value: "", text: "", label: "" }];
	}

	const [inputValue, setInputValue] = useState("");

	const selectedItem = items.find((item) => item.value === field.value) ?? null;

	const filteredItems = useMemo(() => {
		const lowerCaseInputValue = inputValue.toLowerCase();
		return items.filter((item) =>
			inputValue ? caseInsensitiveSearch(item, lowerCaseInputValue) : true,
		);
	}, [items, inputValue]);

	const errors = field.errors;

	const hasErrors = errors && errors.length > 0;

	let baseButtonClassName =
		"flex h-10 shadow-sm bg-white gap-0.5 rounded-lg text-left p-2.5 w-full border";

	if (hasErrors) {
		baseButtonClassName += " border-red-500";
	}

	const {
		getInputProps,
		getItemProps,
		getLabelProps,
		getMenuProps,
		getToggleButtonProps,
		highlightedIndex,
		isOpen,
	} = useCombobox<SearchableOption>({
		items: filteredItems,
		itemToString: (item) => (item ? item.text : ""),
		selectedItem,
		inputValue,
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
		<div className="mb-3 max-w-lg text-sm">
			<div className="flex flex-col gap-1">
				<label className="w-fit" {...getLabelProps()}>
					{label}
				</label>
				<div className="relative">
					<button
						className={baseButtonClassName}
						{...getToggleButtonProps()}
						title={selectedItem?.text}
					>
						<span className="truncate pr-5">{selectedItem?.label}</span>
						<ChevronDown className="absolute right-2.5 top-2.5 size-5" />
					</button>
				</div>
			</div>

			<div
				className={cx(
					"absolute bg-white w-full max-w-lg rounded-lg shadow-lg z-10",
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
							title={item.text}
							className={cx(
								"p-2 cursor-pointer truncate",
								selectedItem?.value === item.value && "bg-yellow-100",
								highlightedIndex === index && "bg-gray-200",
							)}
							key={`${item.value}`}
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

function caseInsensitiveSearch(
	item: SearchableOption,
	inputValue: string,
): boolean {
	// Replace all non-alphanumeric, non-whitespace characters with an empty string
	const strippedInput = inputValue.replace(/[^\w\s]/g, "");
	const regex = new RegExp(strippedInput, "i");

	return regex.test(item.text);
}
