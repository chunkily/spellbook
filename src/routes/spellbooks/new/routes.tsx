import { RouteObject } from "react-router-dom";
import action from "./action";
import loader from "./loader";
import Page from "./page";

const routes: RouteObject[] = [
	{
		path: "new",
		element: <Page />,
		loader: loader,
		action: action,
	},
];

export default routes;
