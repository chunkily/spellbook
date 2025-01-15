import { useCombobox, useMultipleSelection } from "downshift";
import { SearchableOption } from "./Option";
import { XCircle } from "lucide-react";
import { useStringArrayFormField } from "../form/useFormField";
import { useMemo, useState } from "react";
import ErrorList from "./ErrorList";

interface SearchableMultiSelectFieldProps
	extends Omit<
		React.SelectHTMLAttributes<HTMLSelectElement>,
		"value" | "defaultValue"
	> {
	label: React.ReactNode;
	name: string;
	items: SearchableOption[];
}

export default function SearchableMultiSelectField({
	label,
	name,
	items,
}: SearchableMultiSelectFieldProps) {
	const field = useStringArrayFormField(name);

	const [inputValue, setInputValue] = useState("");

	const selectedItemIds = field.value;
	const errors = field.errors;

	const hasErrors = errors && errors.length > 0;

	let baseInputClassName =
		"w-full py-1 px-2 border rounded-lg bg-white inline-flex gap-2 items-center flex-wrap focus-within:border-gray-400";

	if (hasErrors) {
		baseInputClassName += " border-red-500";
	}

	const setSelectedItems = (
		newSelectedItems: SearchableOption[] | undefined,
	) => {
		if (!newSelectedItems) return;

		field.onValueChange(newSelectedItems.map((item) => item.value));
		field.setErrors([]);
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

	const { getDropdownProps, getSelectedItemProps, removeSelectedItem } =
		useMultipleSelection({
			selectedItems,
			onStateChange({ selectedItems: newSelectedItems, type }) {
				switch (type) {
					case useMultipleSelection.stateChangeTypes
						.SelectedItemKeyDownBackspace:
					case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
					case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
					case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
						setSelectedItems(newSelectedItems);
						break;
					default:
						break;
				}
			},
		});

	const {
		getInputProps,
		getItemProps,
		getLabelProps,
		getMenuProps,
		getToggleButtonProps,
		highlightedIndex,
		isOpen,
		selectedItem,
	} = useCombobox({
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

	return (
		<div className="mb-3 max-w-lg text-sm">
			<div className="flex flex-col gap-1">
				<label className="w-fit" {...getLabelProps()}>
					{label}
				</label>
				<div className={baseInputClassName}>
					{selectedItems.map(
						function renderSelectedItem(selectedItemForRender, index) {
							return (
								<div
									className="bg-primary-300 rounded-md py-0.5 px-2 focus:bg-red-300 inline-flex items-center gap-1"
									key={`selected-item-${index}`}
									{...getSelectedItemProps({
										selectedItem: selectedItemForRender,
										index,
									})}
								>
									<span className="inline-block">
										{selectedItemForRender.label}
									</span>
									<XCircle
										className="inline-block w-4 h-4 cursor-pointer"
										onClick={(e) => {
											e.stopPropagation();
											removeSelectedItem(selectedItemForRender);
										}}
									/>
								</div>
							);
						},
					)}
					<div className="flex gap-0.5 grow">
						<input
							className="w-full py-1"
							{...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
						/>
						<button
							aria-label="toggle menu"
							className="px-2"
							type="button"
							{...getToggleButtonProps()}
						>
							&#8595;
						</button>
					</div>
				</div>
			</div>
			<ul
				className={`absolute w-inherit bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
					!(isOpen && filteredItems.length) && "hidden"
				}`}
				{...getMenuProps()}
			>
				{isOpen &&
					filteredItems.map((item, index) => (
						<li
							className={cx(
								highlightedIndex === index && "bg-blue-300",
								selectedItem === item && "font-bold",
								"py-2 px-3 shadow-sm flex flex-col",
							)}
							key={`${item.value}${index}`}
							{...getItemProps({ item, index })}
						>
							{item.label}
						</li>
					))}
			</ul>
			<input type="hidden" name={name} value={field.value} />
			<ErrorList id={`${name}-error`} errors={errors} />
		</div>
	);
}

function cx(...classNames: (string | false | null | undefined)[]): string {
	return classNames.filter(Boolean).join(" ");
}

