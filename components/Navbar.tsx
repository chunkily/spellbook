import { useUserPrefs } from "@/utils/useUserPrefs";
import { NavLink, type NavLinkProps } from "react-router";

export default function Navbar() {
	const { userPrefs } = useUserPrefs();
	const activeCharacterId = userPrefs?.activeCharacterId;

	const spellbookTo = activeCharacterId
		? `/spellbooks/${activeCharacterId}`
		: "/spellbooks";

	return (
		<nav className="container mx-auto px-4 h-16 flex items-center gap-3">
			<NavbarItem to="/">Home</NavbarItem>
			<NavbarItem to={spellbookTo}>Spellbook</NavbarItem>
			<NavbarItem to="/spells">Spell List</NavbarItem>
			<NavbarItem to="/data">Import&nbsp;/ Export</NavbarItem>
		</nav>
	);
}

function NavbarItem({ to, children }: NavLinkProps) {
	const baseClass = "hover:text-primary-300 hover:underline";

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
