import Layout from "./layout";
import Page from "./page";
import { RouteObject } from "react-router";
import exportRoutes from "./export/routes";
import importRoutes from "./import/routes";

const routes: RouteObject[] = [
	{
		path: "data/",
		element: <Layout />,
		children: [
			{
				path: "",
				element: <Page />,
			},
			...exportRoutes,
			...importRoutes,
		],
	},
];

export default routes;
