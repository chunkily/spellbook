import useServerState, { useServerStateArray } from "@/utils/useServerState";
import { useCombobox } from "downshift";
import { useMemo, useState } from "react";
import { SearchableOption } from "./Option";

export default function useSearchableSelectField({
	items,
	serverValue,
	serverErrors,
}: {
	items: SearchableOption[];
	serverValue?: string;
	serverErrors?: string[];
}) {
	const defaultItem = useMemo(
		() =>
			items.find((item) => item.value === serverValue) ?? {
				text: "",
				label: "",
				value: "",
			},
		[items, serverValue],
	);

	const [inputValue, setInputValue] = useServerState(defaultItem?.text ?? "");
	const [selectedItemValue, setSelectedItemValue] = useState<string>(
		serverValue ?? "",
	);
	const [errors, setErrors] = useServerStateArray(serverErrors ?? []);

	const selectedItem = useMemo(() => {
		return (
			items.find((item) => item.value === selectedItemValue) ?? defaultItem
		);
	}, [items, selectedItemValue, defaultItem]);

	const filteredItems = useMemo(() => {
		const lowerCaseInputValue = inputValue.toLowerCase();
		return items.filter((item) =>
			item.text.toLowerCase().includes(lowerCaseInputValue),
		);
	}, [items, inputValue]);

	const cbProps = useCombobox<SearchableOption>({
		items: filteredItems,
		itemToString: (item) => (item ? item.text : ""),
		selectedItem,
		inputValue,
		onInputValueChange: ({ inputValue }) => {
			setInputValue(inputValue);
			setErrors([]);
		},
		onSelectedItemChange: ({ selectedItem }) => {
			setSelectedItemValue(selectedItem?.value ?? "");
			setErrors([]);
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

	return {
		...cbProps,
		errors,
		items: filteredItems,
	};
}
