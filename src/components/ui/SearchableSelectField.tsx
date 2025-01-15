import { useCombobox } from "downshift";
import { SearchableOption } from "./Option";
import React, { useMemo, useState } from "react";
import Button from "./Button";
import useFormField from "../form/useFormField";
import ErrorList from "./ErrorList";

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

	const defaultItem = useMemo(
		() =>
			items.find((item) => item.value === field.value) ?? {
				text: "",
				label: "",
				value: "",
			},
		[items, field.value],
	);

	// TODO: Implement such that input text is not actually used for display, only search.
	// Will make state handling easier.
	const [inputValue, setInputValue] = useState(defaultItem?.text ?? "");

	const selectedItem = useMemo(() => {
		return items.find((item) => item.value === field.value) ?? defaultItem;
	}, [items, field.value, defaultItem]);

	const filteredItems = useMemo(() => {
		const lowerCaseInputValue = inputValue.toLowerCase();
		return items.filter((item) =>
			item.text.toLowerCase().includes(lowerCaseInputValue),
		);
	}, [items, inputValue]);

	const errors = field.errors;

	const hasErrors = errors && errors.length > 0;

	let baseInputClassName = "flex shadow-sm bg-white gap-0.5 rounded-lg";

	if (hasErrors) {
		baseInputClassName += " border-red-500";
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
			field.onValueChange(selectedItem?.value ?? defaultItem.value);
			field.setErrors([]);

			if (propsOnSelectedItemChange) {
				propsOnSelectedItemChange(selectedItem?.value ?? defaultItem.value);
			}
		},
		stateReducer: (state, actionAndChanges) => {
			const { changes, type } = actionAndChanges;

			const isOpening = !state.isOpen && changes.isOpen;
			const isClosing = state.isOpen && !changes.isOpen;

			if (isOpening) {
				switch (type) {
					case useCombobox.stateChangeTypes.ToggleButtonClick:
						// Clear input value when menu is opening from toggle button
						return {
							...changes,
							inputValue: "",
						};
					default:
						return changes;
				}
			}

			// When menu is closing,
			if (isClosing) {
				if (!state.inputValue) {
					if (changes.selectedItem) {
						return {
							...changes,
							inputValue: changes.selectedItem.text,
							selectedItem: changes.selectedItem,
						};
					} else if (filteredItems.length > 0) {
						const closestItem = filteredItems[0];
						return {
							...changes,
							inputValue: closestItem.text,
							selectedItem: closestItem,
						};
					} else if (items.length > 0) {
						const closestItem = items[0];
						return {
							...changes,
							inputValue: closestItem.text,
							selectedItem: closestItem,
						};
					}
				} else if (filteredItems.length > 0) {
					const closestItem = filteredItems[0];
					return {
						...changes,
						inputValue: closestItem.text,
						selectedItem: closestItem,
					};
				} else if (items.length > 0) {
					const closestItem = items[0];
					return {
						...changes,
						inputValue: closestItem.text,
						selectedItem: closestItem,
					};
				}
			}
			return changes;
		},
	});

	return (
		<div className="mb-3 max-w-lg text-sm">
			<div className="flex flex-col gap-1">
				<label className="w-fit" {...getLabelProps()}>
					{label}
				</label>
				<div className={baseInputClassName}>
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
			<ErrorList id={`${name}-error`} errors={errors} />
		</div>
	);
}

function cx(...classes: (string | boolean | undefined)[]) {
	return classes.filter(Boolean).join(" ");
}
