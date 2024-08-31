import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div className="grid grid-cols-1 grid-rows-[4rem_1fr_2rem] min-h-screen bg-secondary-200">
			<header className="bg-primary-700 w-full sticky top-0 text-white">
				<Navbar />
			</header>

			<main className="container mt-3 mx-auto p-3 bg-secondary-300 rounded">
				<Outlet />
			</main>
			<footer className="container mx-auto px-2">
				&copy; 2024 Lee Chengkai
			</footer>
			<ToastContainer />
		</div>
	);
}

export default App;
