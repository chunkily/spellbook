import Page from "./page";
import loader from "./loader";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
	{
		path: ":id",
		element: <Page />,
		loader: loader,
	},
];

export default routes;
