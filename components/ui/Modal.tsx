import { X } from "lucide-react";
import React from "react";
import Button from "./Button";

const ModalContext = React.createContext<{
	isOpen: boolean;
	onClose: () => void;
} | null>(null);

export function ModalHeader({ children }: { children: React.ReactNode }) {
	const context = React.useContext(ModalContext);

	if (!context) {
		throw new Error("ModalHeader must be used inside a Modal");
	}

	return (
		<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
			{children}
			<Button
				variant="secondary"
				aria-label="Close modal"
				onClick={context.onClose}
			>
				<X />
			</Button>
		</div>
	);
}

export function ModalFooter({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
			{children}
		</div>
	);
}

export function ModalBody({ children }: { children: React.ReactNode }) {
	return <div className="p-4 md:p-5 space-y-4">{children}</div>;
}

export default function Modal({
	children,
	isOpen,
	onClose,
}: {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
}) {
	const className = isOpen
		? "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full bg-gray-900 bg-opacity-50"
		: "hidden";

	const ref = React.useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: React.MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			if (isOpen) {
				onClose();
			}
		}
	};

	React.useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				if (isOpen) {
					onClose();
				}
			}
		};

		document.addEventListener("keydown", handleEscapeKey);

		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [isOpen, onClose]);

	return (
		<ModalContext.Provider value={{ isOpen, onClose }}>
			{isOpen && (
				<div
					aria-modal="true"
					aria-hidden={!isOpen}
					className={className}
					onClick={(e) => handleClickOutside(e)}
				>
					<div
						className="relative p-4 w-full max-w-2xl max-h-full mx-auto"
						ref={ref}
					>
						<div className="relative bg-white rounded-lg shadow">
							{children}
						</div>
					</div>
				</div>
			)}
		</ModalContext.Provider>
	);
}
