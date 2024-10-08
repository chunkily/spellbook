import {
	UseMultipleSelectionReturnValue,
	UseSelectReturnValue,
} from "downshift";
import Option from "./Option";
import { PlusCircle, XCircle } from "lucide-react";

interface MultiSelectFieldProps
	extends UseMultipleSelectionReturnValue<Option>,
		UseSelectReturnValue<Option>,
		Omit<
			React.SelectHTMLAttributes<HTMLSelectElement>,
			"value" | "defaultValue"
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
									className="bg-primary-300 rounded-md py-0.5 px-2 focus:bg-red-300 inline-flex items-center  gap-1"
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
					<div
						className="inline-flex items-center px-2 py-1 outline-2 outline-gray-400 cursor-pointer focus:bg-gray-200"
						{...getToggleButtonProps(
							getDropdownProps({ preventKeyAction: isOpen }),
						)}
					>
						<span className="inline-block">Add</span>
						<PlusCircle className="inline-block ml-1 w-3.5 h-3.5" />
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
