import Page from "./page";
import loader from "./loader";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
	{
		path: "/data/export",
		element: <Page />,
		loader: loader,
	},
];

export default routes;
