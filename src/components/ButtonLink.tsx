import { Link, LinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface ButtonLinkProps extends LinkProps {
	variant?: "primary" | "secondary" | "success" | "danger" | "warning";
}

export default function ButtonLink({
	variant = "primary",
	className: propClassName,
	...linkProps
}: ButtonLinkProps) {
	let baseClassName =
		"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2";

	switch (variant) {
		case "primary":
			baseClassName +=
				" bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700";
			break;
		case "secondary": // Like bootstraps's muted colour, not the theme's secondary colour
			baseClassName +=
				" bg-slate-500 text-white hover:bg-slate-600 active:bg-slate-700";
			break;
		case "success":
			baseClassName +=
				" bg-green-500 text-white hover:bg-green-600 active:bg-green-700";
			break;
		case "danger":
			baseClassName +=
				" bg-red-500 text-white hover:bg-red-600 active:bg-red-700";
			break;
		case "warning":
			baseClassName +=
				" bg-yellow-500 text-black hover:bg-yellow-600 active:bg-yellow-700";
			break;
	}
	const className = twMerge(baseClassName, propClassName);

	return <Link className={className} {...linkProps} />;
}
