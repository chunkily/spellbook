import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div className="grid grid-cols-1 grid-rows-[4rem_1fr_4rem] min-h-screen bg-secondary-200">
			<header className="bg-primary-700 w-full sticky top-0 text-white">
				<Navbar />
			</header>
			<main className="container mt-3 mx-auto p-3 bg-secondary-300 rounded">
				<Outlet />
			</main>
			<footer className="container bg-secondary-300 mx-auto px-2">
				&copy; 2024 Lee Chengkai. This application uses trademarks and/or
				copyrights owned by Paizo Inc., used under{" "}
				<a
					href="https://paizo.com/licenses/communityuse"
					className="underline text-blue-700"
				>
					Paizo's Community Use Policy
				</a>
				. We are expressly prohibited from charging you to use or access this
				content. This application is not published, endorsed, or specifically
				approved by Paizo. For more information about Paizo Inc. and Paizo
				products, visit{" "}
				<a href="https://paizo.com" className="underline text-blue-700">
					paizo.com
				</a>
				.
			</footer>
			<ToastContainer />
		</div>
	);
}

export default App;
