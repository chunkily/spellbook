import { useServerStateArray } from "@/utils/useServerState";
import { useMultipleSelection, useCombobox } from "downshift";
import { useState, useMemo } from "react";
import { SearchableOption } from "./Option";

export function useSearchableMultiSelectField({
	items,
	serverValues,
	serverErrors,
}: {
	items: SearchableOption[];
	serverValues?: string[];
	serverErrors?: string[];
}) {
	const [inputValue, setInputValue] = useState("");
	const [selectedItemIds, setSelectedItemIds] = useServerStateArray<string>(
		serverValues ?? [],
	);
	const [errors, setErrors] = useServerStateArray(serverErrors ?? []);

	const setSelectedItems = (
		newSelectedItems: SearchableOption[] | undefined,
	) => {
		if (!newSelectedItems) return;
		setSelectedItemIds(newSelectedItems.map((item) => item.value));
		setErrors([]);
	};

	const selectedItems: SearchableOption[] = useMemo(() => {
		return items.filter((item) => selectedItemIds.includes(item.value));
	}, [items, selectedItemIds]);

	const filteredItems = useMemo(() => {
		const lowerCaseInputValue = inputValue.toLowerCase();
		return items.filter((item) =>
			item.text.toLowerCase().includes(lowerCaseInputValue),
		);
	}, [items, inputValue]);

	const msProps = useMultipleSelection({
		selectedItems,
		onStateChange({ selectedItems: newSelectedItems, type }) {
			switch (type) {
				case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
				case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
				case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
				case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
					setSelectedItems(newSelectedItems);
					setErrors([]);
					break;
				default:
					break;
			}
		},
	});

	const cbProps = useCombobox({
		items: filteredItems,
		itemToString(item) {
			return item ? item.text : "";
		},
		defaultHighlightedIndex: 0, // after selection, highlight the first item.
		selectedItem: null,
		inputValue,
		stateReducer(_state, actionAndChanges) {
			const { changes, type } = actionAndChanges;

			switch (type) {
				case useCombobox.stateChangeTypes.InputKeyDownEnter:
				case useCombobox.stateChangeTypes.ItemClick:
					return {
						...changes,
						isOpen: true, // keep the menu open after selection.
						highlightedIndex: 0, // with the first option highlighted.
					};
				default:
					return changes;
			}
		},
		onStateChange({
			inputValue: newInputValue,
			type,
			selectedItem: newSelectedItem,
		}) {
			switch (type) {
				case useCombobox.stateChangeTypes.InputKeyDownEnter:
				case useCombobox.stateChangeTypes.ItemClick:
				case useCombobox.stateChangeTypes.InputBlur:
					if (newSelectedItem) {
						setSelectedItems([...selectedItems, newSelectedItem]);
						setInputValue("");
					}
					break;
				case useCombobox.stateChangeTypes.InputChange:
					setInputValue(newInputValue ?? "");
					break;
				default:
					break;
			}
		},
	});

	return {
		errors,
		items: filteredItems,
		...msProps,
		...cbProps,
	};
}
