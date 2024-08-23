import { NavLink, Outlet } from "react-router-dom";

function App() {
	return (
		<div className="grid grid-cols-1 grid-rows-[4rem_1fr_2rem] min-h-screen bg-secondary-200">
			<header className="bg-primary-700 w-full sticky top-0 text-white">
				<nav className="container mx-auto flex flex-row">
					<ul>
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="/spellbooks">Spellbooks</NavLink>
						</li>
						<li>
							<NavLink to="/spells">Spell List</NavLink>
						</li>
					</ul>
				</nav>
			</header>

			<main className="container mt-3 mx-auto p-3 bg-secondary-300">
				<Outlet />
			</main>
			<footer className="container mx-auto px-2">
				&copy; 2024 Lee Chengkai
			</footer>
		</div>
	);
}

export default App;
