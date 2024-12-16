import { RouteObject } from "react-router";
import SpellbooksRoutes from "./spellbooks/routes";
import SpellsRoutes from "./spells/routes";
import DataRoutes from "./data/routes";
import Page from "./page";

const routes: RouteObject[] = [
	{
		path: "",
		element: <Page />,
	},
	...SpellbooksRoutes,
	...SpellsRoutes,
	...DataRoutes,
];

export default routes;
