import {
	UseMultipleSelectionReturnValue,
	UseSelectReturnValue,
} from "downshift";
import Option from "./Option";
import { Plus, X } from "lucide-react";

interface MultiSelectFieldProps
	extends UseMultipleSelectionReturnValue<Option>,
		UseSelectReturnValue<Option>,
		Omit<
			React.SelectHTMLAttributes<HTMLSelectElement>,
			"value" | "defaultValues"
		> {
	label: React.ReactNode;
	name: string;
	errors?: string[];
	items: Option[];
}

export default function MultiSelectField({
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
}: MultiSelectFieldProps) {
	return (
		<div className="mb-3 max-w-lg">
			<div className="flex flex-col gap-1">
				<label className="w-fit" {...getLabelProps()}>
					{label}
				</label>
				<div className="w-full px-3 py-2 border rounded-md bg-white inline-flex gap-2 items-center flex-wrap p-1.5 focus-within:border-gray-400">
					{selectedItems.map(
						function renderSelectedItem(selectedItemForRender, index) {
							return (
								<span
									className="bg-primary-300 rounded-md pl-2 focus:bg-red-300"
									key={`selected-item-${index}`}
									{...getSelectedItemProps({
										selectedItem: selectedItemForRender,
										index,
									})}
								>
									{selectedItemForRender.label}
									<span
										className="px-1 cursor-pointer"
										onClick={(e) => {
											e.stopPropagation();
											removeSelectedItem(selectedItemForRender);
										}}
									>
										<X className="inline-block w-4 h-4 relative bottom-[.1rem]" />
									</span>
								</span>
							);
						},
					)}
					<div
						className="px-2 py-1 outline-2 outline-gray-400 cursor-pointer focus:bg-gray-200"
						{...getToggleButtonProps(
							getDropdownProps({ preventKeyAction: isOpen }),
						)}
					>
						<span>Add</span>
						<Plus className="inline-block w-4 h-4 relative bottom-[.1rem]" />
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
