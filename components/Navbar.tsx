import { useState } from "react";
import { useUserPrefs } from "@/utils/useUserPrefs";
import { Link, NavLink, type NavLinkProps } from "react-router";
import Button from "./ui/Button";
import { AlignJustify, X } from "lucide-react";

export default function Navbar() {
	const { userPrefs } = useUserPrefs();
	const activeCharacterId = userPrefs?.activeCharacterId;
	const [isOpen, setIsOpen] = useState(false);

	const spellbookTo = activeCharacterId
		? `/spellbooks/${activeCharacterId}`
		: "/spellbooks";

	return (
		<header className="bg-primary-700 w-full sticky top-0 text-white z-10">
			<nav className="container mx-auto px-4 h-16 flex items-center justify-between">
				<div className="max-sm:hidden flex items-center gap-3">
					<NavbarItem to="/">
						<img className="size-12" src="/icon.png" alt="Spellbook logo" />
					</NavbarItem>
					<NavbarItem to={spellbookTo}>Spellbook</NavbarItem>
					<NavbarItem to="/spells">Spell List</NavbarItem>
					<NavbarItem to="/data">Import&nbsp;/ Export</NavbarItem>
				</div>

				<div className="sm:hidden">
					<Link to="/">
						<img className="size-12" src="/icon.png" alt="Spellbook logo" />
					</Link>
				</div>
				<Button
					onClick={() => setIsOpen(!isOpen)}
					className="sm:hidden text-primary-300"
				>
					{isOpen ? <X /> : <AlignJustify />}
				</Button>
			</nav>
			{isOpen && (
				<div className="flex flex-col sm:hidden bg-primary-700 absolute w-full p-3">
					<NavbarItem to="/">Home</NavbarItem>
					<NavbarItem to={spellbookTo}>Spellbook</NavbarItem>
					<NavbarItem to="/spells">Spell List</NavbarItem>
					<NavbarItem to="/data">Import&nbsp;/ Export</NavbarItem>
				</div>
			)}
		</header>
	);
}

function NavbarItem({ to, children }: NavLinkProps) {
	const baseClass = "hover:text-primary-300 hover:underline py-2";

	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				(isActive ? "text-primary-300 underline " : "") + baseClass
			}
		>
			{children}
		</NavLink>
	);
}
