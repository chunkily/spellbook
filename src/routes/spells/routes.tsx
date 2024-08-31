import Page from "./page";
import loader from "./loader";
import { RouteObject } from "react-router-dom";
import Layout from "./layout";
import idroutes from "./[id]/routes";
import newRoutes from "./new/routes";

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
			...idroutes,
			...newRoutes,
		],
	},
];

export default routes;
