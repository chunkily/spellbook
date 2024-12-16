import Page from "./page";
import loader from "./loader";
import { RouteObject } from "react-router";
import action from "./action";
import deleteRoutes from "./delete/routes";
import learnRoutes from "./learn/routes";

const routes: RouteObject[] = [
	{
		path: "/spellbooks/:id",
		element: <Page />,
		loader: loader,
		action: action,
	},
	...deleteRoutes,
	...learnRoutes,
];

export default routes;
