import Page from "./page";
import Layout from "./layout";
import loader from "./loader";
import { RouteObject } from "react-router-dom";
import idroutes from "./[id]/routes";
import newroutes from "./new/routes";

const routes: RouteObject[] = [
	{
		path: "/spellbooks",
		element: <Layout />,
		children: [
			{
				path: "",
				element: <Page />,
				loader: loader,
			},
			...idroutes,
			...newroutes,
		],
	},
];

export default routes;
