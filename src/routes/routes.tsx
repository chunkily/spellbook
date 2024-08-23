import { RouteObject } from "react-router-dom";
import SpellbooksRoutes from "./spellbooks/routes";
import SpellsRoutes from "./spells/routes";
import Page from "./page";

const routes: RouteObject[] = [
	{
		path: "",
		element: <Page />,
	},
	...SpellbooksRoutes,
	...SpellsRoutes,
];

export default routes;
