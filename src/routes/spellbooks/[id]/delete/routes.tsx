import Page from "./page";
import loader from "./loader";
import { RouteObject } from "react-router-dom";
import action from "./action";

const routes: RouteObject[] = [
	{
		path: "/spellbooks/:id/delete",
		element: <Page />,
		loader: loader,
		action: action,
	},
];

export default routes;
