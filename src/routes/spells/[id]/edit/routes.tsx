import Page from "./page";
import loader from "./loader";
import action from "./action";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
	{
		path: ":id/edit",
		element: <Page />,
		loader: loader,
		action: action,
	},
];

export default routes;
