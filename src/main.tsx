import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./page.tsx";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes.tsx";
import { UserPrefsProvider } from "./userPrefs.tsx";

const router = createHashRouter([
	{
		path: "/",
		element: <App />,
		children: routes,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<UserPrefsProvider>
			<RouterProvider router={router} />
		</UserPrefsProvider>
	</StrictMode>,
);
