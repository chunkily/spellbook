import { Outlet } from "react-router-dom";

export default function SpellbooksLayout() {
	return (
		<div>
			<h1>Spellbooks</h1>
			<Outlet />
		</div>
	);
}
