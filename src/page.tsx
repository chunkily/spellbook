import { Link, Outlet } from "react-router-dom";

function App() {
	return (
		<div className="grid grid-cols-[]">
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
						<Link to="/spellbooks">Spellbooks</Link>
						<Link to="/spells">Spell List</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
}

export default App;
