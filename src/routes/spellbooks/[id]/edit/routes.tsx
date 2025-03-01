import { RouteObject } from "react-router";
import action from "./action";
import loader from "./loader";
import Page from "./page";

const routes: RouteObject[] = [
	{
		path: "/spellbooks/:id/edit",
		element: <Page />,
		loader: loader,
		action: action,
	},
];

export default routes;
