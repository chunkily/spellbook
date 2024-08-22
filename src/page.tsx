import { Link, Outlet } from "react-router-dom";

function App() {
	return (
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
						<Link to="/spellbooks">Spellbooks</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
}

export default App;
