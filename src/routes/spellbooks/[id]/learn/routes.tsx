import Page from "./page";
import loader from "./loader";
import optionsLoader from "./optionsLoader";
import { RouteObject } from "react-router";
import action from "./action";

const routes: RouteObject[] = [
	{
		path: "/spellbooks/:id/learn",
		element: <Page />,
		loader: loader,
		action: action,
	},
	{
		path: "/spellbooks/:id/learn/options",
		loader: optionsLoader,
	},
];

export default routes;

