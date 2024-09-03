import {
	UseComboboxReturnValue,
	UseMultipleSelectionReturnValue,
} from "downshift";
import { SearchableOption } from "./Option";
import { XCircle } from "lucide-react";

interface SearchableMultiSelectFieldProps
	extends UseMultipleSelectionReturnValue<SearchableOption>,
		UseComboboxReturnValue<SearchableOption>,
		Omit<
			React.SelectHTMLAttributes<HTMLSelectElement>,
			"value" | "defaultValue"
		> {
	label: React.ReactNode;
	name: string;
	errors?: string[];
	items: SearchableOption[];
}

export default function SearchableMultiSelectField({
	label,
	name,
	selectedItems,
	highlightedIndex,
	selectedItem,
	items,
	isOpen,
	getLabelProps,
	getSelectedItemProps,
	removeSelectedItem,
	getToggleButtonProps,
	getDropdownProps,
	getMenuProps,
	getItemProps,
	getInputProps,
}: SearchableMultiSelectFieldProps) {
	return (
		<div className="mb-3 max-w-lg text-sm">
			<div className="flex flex-col gap-1">
				<label className="w-fit" {...getLabelProps()}>
					{label}
				</label>
				<div className="w-full py-1 px-2 border rounded-lg bg-white inline-flex gap-2 items-center flex-wrap focus-within:border-gray-400">
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
							key={`${item.value}${index}`}
							{...getItemProps({ item, index })}
						>
							{item.label}
						</li>
					))}
			</ul>
			<input
				type="hidden"
				name={name}
				value={selectedItems.map((item) => item.value).join(",")}
			/>
		</div>
	);
}

function cx(...classNames: (string | false | null | undefined)[]): string {
	return classNames.filter(Boolean).join(" ");
}
