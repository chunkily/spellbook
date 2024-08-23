import Page from "./page";
import loader from "./loader";
import { RouteObject } from "react-router-dom";
import action from "./action";
import deleteRoutes from "./delete/routes";

const routes: RouteObject[] = [
	{
		path: ":id",
		element: <Page />,
		loader: loader,
		action: action,
	},
	...deleteRoutes,
];

export default routes;
