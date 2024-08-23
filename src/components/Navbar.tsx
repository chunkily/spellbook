import { NavLink, NavLinkProps } from "react-router-dom";

export default function Navbar() {
	return (
		<nav className="container mx-auto h-full">
			<ul className="flex flex-row items-center h-full gap-3">
				<NavbarItem to="/">Home</NavbarItem>
				<NavbarItem to="/spellbooks">Spellbooks</NavbarItem>
				<NavbarItem to="/spells">Spell List</NavbarItem>
			</ul>
		</nav>
	);
}

function NavbarItem({ to, children }: NavLinkProps) {
	const baseClass = "hover:text-primary-300 hover:underline";

	return (
		<li>
			<NavLink
				to={to}
				className={({ isActive }) =>
					(isActive ? "text-primary-300 underline " : "") + baseClass
				}
			>
				{children}
			</NavLink>
		</li>
	);
}
