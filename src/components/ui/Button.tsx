import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "success" | "danger" | "warning";
	type?: "button" | "submit" | "reset";
}

function variantColour(variant: ButtonProps["variant"]) {
	switch (variant) {
		case "primary":
			return "primary";
		case "secondary":
			// Like bootstraps's muted colour, not the theme's secondary colour
			return "slate";
		case "success":
			return "green";
		case "danger":
			return "red";
		case "warning":
			return "yellow";
	}
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className: propClassName,
			children,
			disabled,
			variant = "primary",
			...props
		},
		ref,
	) => {
		let baseClassName =
			"px-4 py-2.5 text-sm font-medium text-white inline-flex items-center rounded-lg text-center";

		const colour = variantColour(variant);

		if (disabled) {
			baseClassName += ` bg-${colour}-400 cursor-not-allowed`;
		} else {
			baseClassName += ` bg-${colour}-500 hover:bg-${colour}-600 active:bg-${colour}-700`;
		}

		const className = twMerge(baseClassName, propClassName);

		return (
			<button ref={ref} className={className} disabled={disabled} {...props}>
				{children}
			</button>
		);
	},
);

Button.displayName = "Button";

export default Button;
