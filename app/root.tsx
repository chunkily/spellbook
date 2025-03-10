import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import { UserPrefsProvider } from "@/utils/userPrefs";
import reactToastifyHref from "react-toastify/ReactToastify.min.css?url";

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
	{
		rel: "stylesheet",
		href: reactToastifyHref,
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<UserPrefsProvider>
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<Meta />
					<Links />
				</head>
				<body>
					<div className="flex flex-col min-h-screen bg-secondary-200">
						<header className="bg-primary-700 w-full sticky top-0 text-white z-10">
							<Navbar />
						</header>
						<main className="grow container mx-auto p-3 bg-secondary-300 rounded-sm">
							{children}
						</main>
						<footer className="container bg-secondary-300 mx-auto px-2">
							&copy; 2024-2025 Lee Chengkai. This application uses trademarks
							and/or copyrights owned by Paizo Inc., used under{" "}
							<a
								href="https://paizo.com/licenses/communityuse"
								className="underline text-blue-700"
							>
								Paizo's Community Use Policy
							</a>
							. We are expressly prohibited from charging you to use or access
							this content. This application is not published, endorsed, or
							specifically approved by Paizo. For more information about Paizo
							Inc. and Paizo products, visit{" "}
							<a href="https://paizo.com" className="underline text-blue-700">
								paizo.com
							</a>
							.
						</footer>
					</div>
					<ToastContainer />
					<ScrollRestoration />
					<Scripts />
				</body>
			</html>
		</UserPrefsProvider>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
