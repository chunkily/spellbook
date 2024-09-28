import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "success" | "danger" | "warning";
	type?: "button" | "submit" | "reset";
}

import React from "react";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className: propClassName, children, variant = "primary", ...props },
		ref,
	) => {
		let baseClassName =
			"px-4 py-2.5 text-sm font-medium text-white inline-flex items-center rounded-lg text-center";

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

		return (
			<button ref={ref} className={className} {...props}>
				{children}
			</button>
		);
	},
);

Button.displayName = "Button";

export default Button;
