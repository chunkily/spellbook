import Page from "./page";
import loader from "./loader";
import { RouteObject } from "react-router-dom";
import editRoutes from "./edit/routes";

const routes: RouteObject[] = [
	{
		path: ":id",
		element: <Page />,
		loader: loader,
	},
	...editRoutes,
];

export default routes;
