import Page from "./page";
import loader from "./loader";
import { RouteObject } from "react-router-dom";
import Layout from "./layout";

const routes: RouteObject[] = [
	{
		path: "spells/",
		element: <Layout />,
		children: [
			{
				path: "",
				element: <Page />,
				loader,
			},
		],
	},
];

export default routes;
