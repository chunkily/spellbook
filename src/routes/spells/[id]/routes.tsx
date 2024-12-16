import Page from "./page";
import loader from "./loader";
import { RouteObject } from "react-router";
import editRoutes from "./edit/routes";
import deleteRoutes from "./delete/routes";

const routes: RouteObject[] = [
	{
		path: ":id",
		element: <Page />,
		loader: loader,
	},
	...editRoutes,
	...deleteRoutes,
];

export default routes;
