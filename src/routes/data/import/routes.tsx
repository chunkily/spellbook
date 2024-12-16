import Page from "./page";
import loader from "./loader";
import action from "./action";
import { RouteObject } from "react-router";

const routes: RouteObject[] = [
	{
		path: "/data/import",
		element: <Page />,
		loader: loader,
		action: action,
	},
];

export default routes;
