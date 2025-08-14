"use client";

import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label: "Login" | "Register";
}

const Button: React.FC<ButtonProps> = ({
	label,
	className,
	type = "submit",
	...props
}) => {
	return (
		<button
			type={type}
			className={clsx(
				"w-full rounded-md bg-purple-600 px-4 py-2 text-white font-medium hover:bg-purple-700 transition",
				className
			)}
			{...props}
		>
			{label}
		</button>
	);
};

export default Button;
