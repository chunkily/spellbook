import { useServerStateArray } from "@/utils/useServerState";
import { useMultipleSelection, useSelect } from "downshift";
import { useMemo } from "react";
import Option from "./Option";

export default function useMultiSelectField({
	items,
	serverValues,
	serverErrors,
}: {
	items: Option[];
	serverValues?: string[];
	serverErrors?: string[];
}) {
	const [selectedItemIds, setSelectedItemIds] = useServerStateArray<string>(
		serverValues ?? [],
	);
	const [errors, setErrors] = useServerStateArray(serverErrors ?? []);

	const selectedItems = useMemo(() => {
		return items.filter((item) => selectedItemIds.includes(item.value));
	}, [items, selectedItemIds]);

	const msProps = useMultipleSelection<Option>({
		selectedItems,
		onSelectedItemsChange: ({ selectedItems: newSelectedItems }) => {
			setSelectedItemIds(newSelectedItems.map((item) => item.value));
			setErrors([]);
		},
	});

	const sProps = useSelect<Option>({
		selectedItem: null,
		defaultHighlightedIndex: 0, // after selection, highlight the first item.
		items,
		stateReducer: (_state, actionAndChanges) => {
			const { changes, type } = actionAndChanges;
			switch (type) {
				case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
				case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
				case useSelect.stateChangeTypes.ItemClick:
					return {
						...changes,
						isOpen: true, // keep the menu open after selection.
						highlightedIndex: 0, // with the first option highlighted.
					};
			}
			return changes;
		},
		onStateChange: ({ type, selectedItem: newSelectedItem }) => {
			switch (type) {
				case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
				case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
				case useSelect.stateChangeTypes.ItemClick:
				case useSelect.stateChangeTypes.ToggleButtonBlur:
					if (newSelectedItem) {
						msProps.addSelectedItem(newSelectedItem);
					}
					break;
				default:
					break;
			}
		},
	});

	return {
		errors,
		items,
		...msProps,
		...sProps,
	};
}
